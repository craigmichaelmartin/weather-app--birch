import LocationView from '../../../../../javascript/components/location.js';
import AppStateModel from '../../../../../javascript/models/app.js';
//import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

describe('Location view', function () {

    it('should be defined', function () {
        expect(LocationView).not.to.be.undefined;
    });

    describe('after being initialized', function () {

        describe('the event listeners', function () {

            beforeEach(function () {
                this.appState = new AppStateModel();
                sinon.stub(LocationView.prototype, 'render');
                sinon.stub(LocationView.prototype, 'flagInvalidZip');
                sinon.stub(LocationView.prototype, 'indicateLoading');
                this.locationView = new LocationView({appState: this.appState});
            });

            afterEach(function () {
                LocationView.prototype.render.restore();
                LocationView.prototype.flagInvalidZip.restore();
                LocationView.prototype.indicateLoading.restore();

            });

            describe('for appState model', function () {

                it('should correctly respond to dataReady', function () {
                    this.appState.trigger('dataReady');
                    // using called twice because initialize calls it once
                    expect(this.locationView.render.calledTwice).to.be.true;
                });

                it('should correctly respond to changing zip', function () {
                    this.appState.trigger('change:zip');
                    expect(this.locationView.indicateLoading.calledOnce).to.be.true;
                });

                it('should correctly respond to invalid trigger', function () {
                    this.appState.trigger('invalid');
                    expect(this.locationView.flagInvalidZip.calledOnce).to.be.true;
                });

            });
        });
    });
});
