import ChartView from '../../../../../javascript/components/chart.js';
import AppStateModel from '../../../../../javascript/models/app.js';
// import { describe, it } from 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';

describe('Chart view', () => {
    it('should be defined', () => {
        expect(ChartView).not.to.be.undefined;
    });
    describe('after being initialized', () => {
        let appState, chart;
        beforeEach(() => {
            appState = new AppStateModel();
            sinon.stub(ChartView.prototype, 'render');
            chart = new ChartView({appState});
        });
        afterEach(() => {
            ChartView.prototype.render.restore();
        });
        describe('the event listeners', () => {
            describe('for appState model', () => {
                it('should correctly respond to dataReady', () => {
                    appState.trigger('dataReady');
                    // using called twice because initialize calls it once
                    expect(chart.render.calledTwice).to.be.true;
                });
                it('should correctly respond to changing day', () => {
                    appState.trigger('change:day');
                    // using called twice because initialize calls it once
                    expect(chart.render.calledTwice).to.be.true;
                });
                it('should correctly respond to changing scale', () => {
                    appState.trigger('change:scale');
                    // using called twice because initialize calls it once
                    expect(chart.render.calledTwice).to.be.true;
                });
            });
        });
    });
});
