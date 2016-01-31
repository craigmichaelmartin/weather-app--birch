define(function (require) {
    'use strict';

    var ChartView = require('components/chart');
    var AppStateModel = require('models/app');

    describe('Chart view', function () {

        it('should be defined', function () {
            expect(ChartView).not.to.be.undefined;
        });

        describe('after being initialized', function () {

            beforeEach(function () {
                this.appState = new AppStateModel();
                sinon.stub(ChartView.prototype, 'render');
                this.chart = new ChartView({appState: this.appState});
            });

            afterEach(function () {
                ChartView.prototype.render.restore();
            });

            describe('the event listeners', function () {

                describe('for appState model', function () {

                    it('should correctly respond to dataReady', function () {
                        this.appState.trigger('dataReady');
                        // using called twice because initialize calls it once
                        expect(this.chart.render.calledTwice).to.be.true;
                    });

                    it('should correctly respond to changing day', function () {
                        this.appState.trigger('change:day');
                        // using called twice because initialize calls it once
                        expect(this.chart.render.calledTwice).to.be.true;
                    });

                    it('should correctly respond to changing scale', function () {
                        this.appState.trigger('change:scale');
                        // using called twice because initialize calls it once
                        expect(this.chart.render.calledTwice).to.be.true;
                    });

                });
            });
        });
    });
});
