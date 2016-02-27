import AppStateModel from '../../../../../javascript/models/app.js';
//import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

describe('App state model', function () {

    it('should be defined', function () {
        expect(AppStateModel).not.to.be.undefined;
    });

    describe('after being initialized', function () {

        beforeEach(function () {
            this.appState = new AppStateModel();
            this.appState.on('invalid', function (model, error, options) {
                this.message = error;
            }.bind(this));
        });

        afterEach(function () {
            this.appState.off('invalid');
            this.appState = void 0;
        });

        describe('invalid inputs', function () {

            describe('for zip values', function () {

                it('should not be set and contain an error message for no value', function () {
                    expect(this.appState.set({ zip: '' }, {validate: true})).to.be.false;
                    expect(this.appState.validationError).to.eql([this.appState.zipNotNumeric]);
                    expect(this.message).to.eql([this.appState.zipNotNumeric]);
                });

                it('should not be set and contain an error message for non-numeric', function () {
                    expect(this.appState.set({ zip: '12A65' }, {validate: true})).to.be.false;
                    expect(this.appState.validationError).to.eql([this.appState.zipNotNumeric]);
                    expect(this.message).to.eql([this.appState.zipNotNumeric]);
                });

                it('should not be set and contain an error message for invalidly long length', function () {
                    expect(this.appState.set({ zip: 123456 }, {validate: true})).to.be.false;
                    expect(this.appState.validationError).to.eql([this.appState.zipNotLength]);
                    expect(this.message).to.eql([this.appState.zipNotLength]);
                });

                it('should not be set and contain an error message for invalidly short length', function () {
                    expect(this.appState.set({ zip: 1234 }, {validate: true})).to.be.false;
                    expect(this.appState.validationError).to.eql([this.appState.zipNotLength]);
                    expect(this.message).to.eql([this.appState.zipNotLength]);
                });

                it('should not be set and contain an error message for negative', function () {
                    expect(this.appState.set({ zip: -1234 }, {validate: true})).to.be.false;
                    expect(this.appState.validationError).to.eql([this.appState.zipNotLength]);
                    expect(this.message).to.eql([this.appState.zipNotLength]);
                });

            });

            describe('for day values', function () {

                beforeEach(function () {
                    this.clock = sinon.useFakeTimers(new Date(2015, 10, 25).getTime());
                });

                afterEach(function () {
                    this.clock.restore();
                });

                it('should not be set and contain an error message for too far out', function () {
                    expect(this.appState.set({ zip: 44147, day: 100 }, {validate: true})).to.be.false;
                    expect(this.appState.validationError).to.eql([AppStateModel.prototype.dayNotNear]);
                    expect(this.message).to.eql([this.appState.dayNotNear]);
                });

                it('should not be set and contain an error message for too far out', function () {
                    expect(this.appState.set({ zip: 44147, day: 15 }, {validate: true})).to.be.false;
                    expect(this.appState.validationError).to.eql([AppStateModel.prototype.dayNotNear]);
                    expect(this.message).to.eql([this.appState.dayNotNear]);
                });

            });

            describe('for hour values', function () {

                beforeEach(function () {
                    this.clock = sinon.useFakeTimers(new Date(2015, 10, 25, 12).getTime());
                });

                afterEach(function () {
                    this.clock.restore();
                });

                it('should not be set and contain an error message for hour without day', function () {
                    expect(this.appState.set({ zip: 44147, hour: 13, day: undefined }, {validate: true})).to.be.false;
                    expect(this.appState.validationError).to.eql([AppStateModel.prototype.hourNeedsDay]);
                    expect(this.message).to.eql([this.appState.hourNeedsDay]);
                });

                it('should not be set and contain an error message for invalid', function () {
                    expect(this.appState.set({ zip: 44147, day: 25, hour: 100 }, {validate: true})).to.be.false;
                    expect(this.appState.validationError).to.eql([AppStateModel.prototype.hourNotValid]);
                    expect(this.message).to.eql([this.appState.hourNotValid]);
                });

                it('should not be set and contain an error message for invalid today', function () {
                    expect(this.appState.set({ zip: 44147, day: 25, hour: 10 }, {validate: true})).to.be.false;
                    expect(this.appState.validationError).to.eql([AppStateModel.prototype.hourNotValidToday]);
                    expect(this.message).to.eql([this.appState.hourNotValidToday]);
                });

            });

            describe('for scale values', function () {

                it('should return an error message for invalid scale', function () {
                    expect(this.appState.set({ zip: 44147, scale: 'kelvin' }, {validate: true})).to.be.false;
                    expect(this.appState.validationError).to.eql([AppStateModel.prototype.scaleNotValid]);
                    expect(this.message).to.eql([this.appState.scaleNotValid]);
                });

            });

        });
    });
});
