import AppStateModel from '../../../../../javascript/models/app.js';
import { expect } from 'chai';
import sinon from 'sinon';

describe('App state model', function () {

    it('should be defined', function () {
        expect(AppStateModel).not.to.be.undefined;
    });

    describe('the validate function', function () {

        describe('for zip values', function () {

            it('should return an error message for no value', function () {
                expect(AppStateModel.prototype.validate({ zip: '' })).to.eql([AppStateModel.prototype.zipNotNumeric]);
            });

            it('should return an error message for non-numeric', function () {
                expect(AppStateModel.prototype.validate({ zip: '12A65' })).to.eql([AppStateModel.prototype.zipNotNumeric]);
            });

            it('should return an error message for invalidly long length', function () {
                expect(AppStateModel.prototype.validate({ zip: 123456 })).to.eql([AppStateModel.prototype.zipNotLength]);
            });

            it('should return an error message for invalidly short length', function () {
                expect(AppStateModel.prototype.validate({ zip: 1234 })).to.eql([AppStateModel.prototype.zipNotLength]);
            });

            it('should return an error message for negative', function () {
                expect(AppStateModel.prototype.validate({ zip: -1234 })).to.eql([AppStateModel.prototype.zipNotLength]);
            });

        });

        describe('for day values', function () {

            beforeEach(function () {
                this.clock = sinon.useFakeTimers(new Date(2015, 10, 25).getTime());
            });

            afterEach(function () {
                this.clock.restore();
            });

            it('should return an error message for too far out', function () {
                expect(AppStateModel.prototype.validate({ zip: 44147, day: 100 })).to.eql([AppStateModel.prototype.dayNotNear]);
            });

            it('should return an error message for too far out', function () {
                expect(AppStateModel.prototype.validate({ zip: 44147, day: 15 })).to.eql([AppStateModel.prototype.dayNotNear]);
            });

        });

        describe('for hour values', function () {

            beforeEach(function () {
                this.clock = sinon.useFakeTimers(new Date(2015, 10, 25, 12).getTime());
            });

            afterEach(function () {
                this.clock.restore();
            });

            it('should return an error message for hour without day', function () {
                expect(AppStateModel.prototype.validate({ zip: 44147, hour: 13 })).to.eql([AppStateModel.prototype.hourNeedsDay]);
            });

            it('should return an error message for invalid', function () {
                expect(AppStateModel.prototype.validate({ zip: 44147, day: 25, hour: 100 })).to.eql([AppStateModel.prototype.hourNotValid]);
            });

            it('should return an error message for invalid today', function () {
                expect(AppStateModel.prototype.validate({ zip: 44147, day: 25, hour: 10 })).to.eql([AppStateModel.prototype.hourNotValidToday]);
            });

        });

        describe('for scale values', function () {

            it('should return an error message for invalid scale', function () {
                expect(AppStateModel.prototype.validate({ zip: 44147, scale: 'kelvin' })).to.eql([AppStateModel.prototype.scaleNotValid]);
            });

        });
    });
});
