import AppStateModel from '../../../../../javascript/models/app.js';
import {expect} from 'chai';
import sinon from 'sinon';

describe('App state model', () => {
    it('should be defined', () => {
        expect(AppStateModel).not.to.be.undefined;
    });
    describe('the validate function', () => {
        describe('for zip values', () => {
            it('should return an error message for no value', () => {
                expect(AppStateModel.prototype.validate({zip: ''})).to.eql([AppStateModel.prototype.zipNotNumeric]);
            });
            it('should return an error message for non-numeric', () => {
                expect(AppStateModel.prototype.validate({zip: '12A65'})).to.eql([AppStateModel.prototype.zipNotNumeric]);
            });
            it('should return an error message for invalidly long length', () => {
                expect(AppStateModel.prototype.validate({zip: 123456})).to.eql([AppStateModel.prototype.zipNotLength]);
            });
            it('should return an error message for invalidly short length', () => {
                expect(AppStateModel.prototype.validate({zip: 1234})).to.eql([AppStateModel.prototype.zipNotLength]);
            });
            it('should return an error message for negative', () => {
                expect(AppStateModel.prototype.validate({zip: -1234})).to.eql([AppStateModel.prototype.zipNotLength]);
            });
        });
        describe('for day values', () => {
            let clock;
            beforeEach(() => {
                clock = sinon.useFakeTimers(new Date(2015, 10, 25).getTime());
            });
            afterEach(() => {
                clock.restore();
            });
            it('should return an error message for too far out', () => {
                expect(AppStateModel.prototype.validate({zip: 44147, day: 100})).to.eql([AppStateModel.prototype.dayNotNear]);
            });
            it('should return an error message for too far out', () => {
                expect(AppStateModel.prototype.validate({zip: 44147, day: 15})).to.eql([AppStateModel.prototype.dayNotNear]);
            });
        });
        describe('for hour values', () => {
            let clock;
            beforeEach(() => {
                clock = sinon.useFakeTimers(new Date(2015, 10, 25, 12).getTime());
            });
            afterEach(() => {
                clock.restore();
            });
            it('should return an error message for hour without day', () => {
                expect(AppStateModel.prototype.validate({zip: 44147, hour: 13})).to.eql([AppStateModel.prototype.hourNeedsDay]);
            });
            it('should return an error message for invalid', () => {
                expect(AppStateModel.prototype.validate({zip: 44147, day: 25, hour: 100})).to.eql([AppStateModel.prototype.hourNotValid]);
            });
            it('should return an error message for invalid today', () => {
                expect(AppStateModel.prototype.validate({zip: 44147, day: 25, hour: 10})).to.eql([AppStateModel.prototype.hourNotValidToday]);
            });
        });
        describe('for scale values', () => {
            it('should return an error message for invalid scale', () => {
                expect(AppStateModel.prototype.validate({zip: 44147, scale: 'kelvin'})).to.eql([AppStateModel.prototype.scaleNotValid]);
            });
        });
    });
});
