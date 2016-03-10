import LocationView from '../../../../../javascript/components/location.js';
import AppStateModel from '../../../../../javascript/models/app.js';
// import { describe, it } from 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';

describe('Location view', () => {
    it('should be defined', () => {
        expect(LocationView).not.to.be.undefined;
    });
    describe('after being initialized', () => {
        describe('the event listeners', () => {
            let appState, locationView;
            beforeEach(() => {
                appState = new AppStateModel();
                sinon.stub(LocationView.prototype, 'render');
                sinon.stub(LocationView.prototype, 'flagInvalidZip');
                sinon.stub(LocationView.prototype, 'indicateLoading');
                locationView = new LocationView({appState});
            });
            afterEach(() => {
                LocationView.prototype.render.restore();
                LocationView.prototype.flagInvalidZip.restore();
                LocationView.prototype.indicateLoading.restore();
            });
            describe('for appState model', () => {
                it('should correctly respond to dataReady', () => {
                    appState.trigger('dataReady');
                    // using called twice because initialize calls it once
                    expect(locationView.render.calledTwice).to.be.true;
                });
                it('should correctly respond to changing zip', () => {
                    appState.trigger('change:zip');
                    expect(locationView.indicateLoading.calledOnce).to.be.true;
                });
                it('should correctly respond to invalid trigger', () => {
                    appState.trigger('invalid');
                    expect(locationView.flagInvalidZip.calledOnce).to.be.true;
                });
            });
        });
    });
});
