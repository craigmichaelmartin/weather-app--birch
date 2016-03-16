import AppStateModel from '../../../../../javascript/models/app.js';
// import { describe, it } from 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';

describe('App state model', () => {
    it('should be defined', () => {
        expect(AppStateModel).not.to.be.undefined;
    });
    describe('after being initialized', () => {
        let appState, message;
        beforeEach(() => {
            appState = new AppStateModel();
            appState.on('invalid', (model, error) => {
                message = error;
            });
        });
        afterEach(() => {
            appState.off('invalid');
            appState = void 0;
        });
        describe('invalid inputs', () => {
            describe('for zip values', () => {
                it('should not be set and contain an error message for no value', () => {
                    expect(appState.set({zip: ''}, {validate: true})).to.be.false;
                    expect(appState.validationError).to.eql([appState.zipNotNumeric]);
                    expect(message).to.eql([appState.zipNotNumeric]);
                });
                it('should not be set and contain an error message for non-numeric', () => {
                    expect(appState.set({zip: '12A65'}, {validate: true})).to.be.false;
                    expect(appState.validationError).to.eql([appState.zipNotNumeric]);
                    expect(message).to.eql([appState.zipNotNumeric]);
                });
                it('should not be set and contain an error message for invalidly long length', () => {
                    expect(appState.set({zip: 123456}, {validate: true})).to.be.false;
                    expect(appState.validationError).to.eql([appState.zipNotLength]);
                    expect(message).to.eql([appState.zipNotLength]);
                });
                it('should not be set and contain an error message for invalidly short length', () => {
                    expect(appState.set({zip: 1234}, {validate: true})).to.be.false;
                    expect(appState.validationError).to.eql([appState.zipNotLength]);
                    expect(message).to.eql([appState.zipNotLength]);
                });
                it('should not be set and contain an error message for negative', () => {
                    expect(appState.set({zip: -1234}, {validate: true})).to.be.false;
                    expect(appState.validationError).to.eql([appState.zipNotLength]);
                    expect(message).to.eql([appState.zipNotLength]);
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
                it('should not be set and contain an error message for too far out', () => {
                    expect(appState.set({zip: 44147, day: 100}, {validate: true})).to.be.false;
                    expect(appState.validationError).to.eql([AppStateModel.prototype.dayNotNear]);
                    expect(message).to.eql([appState.dayNotNear]);
                });
                it('should not be set and contain an error message for too far out', () => {
                    expect(appState.set({zip: 44147, day: 15}, {validate: true})).to.be.false;
                    expect(appState.validationError).to.eql([AppStateModel.prototype.dayNotNear]);
                    expect(message).to.eql([appState.dayNotNear]);
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
                it('should not be set and contain an error message for hour without day', () => {
                    expect(appState.set({zip: 44147, hour: 13, day: void 0}, {validate: true})).to.be.false;
                    expect(appState.validationError).to.eql([AppStateModel.prototype.hourNeedsDay]);
                    expect(message).to.eql([appState.hourNeedsDay]);
                });
                it('should not be set and contain an error message for invalid', () => {
                    expect(appState.set({zip: 44147, day: 25, hour: 100}, {validate: true})).to.be.false;
                    expect(appState.validationError).to.eql([AppStateModel.prototype.hourNotValid]);
                    expect(message).to.eql([appState.hourNotValid]);
                });
                it('should not be set and contain an error message for invalid today', () => {
                    expect(appState.set({zip: 44147, day: 25, hour: 10}, {validate: true})).to.be.false;
                    expect(appState.validationError).to.eql([AppStateModel.prototype.hourNotValidToday]);
                    expect(message).to.eql([appState.hourNotValidToday]);
                });
            });
            describe('for scale values', () => {
                it('should return an error message for invalid scale', () => {
                    expect(appState.set({zip: 44147, scale: 'kelvin'}, {validate: true})).to.be.false;
                    expect(appState.validationError).to.eql([AppStateModel.prototype.scaleNotValid]);
                    expect(message).to.eql([appState.scaleNotValid]);
                });
            });
        });
    });
});
