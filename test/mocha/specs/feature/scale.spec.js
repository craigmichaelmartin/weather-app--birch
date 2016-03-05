import { createServer, createApp, domEvent } from '../../helpers';
import { getScaledTemperature } from '../../../../javascript/util/temperature';
//import { describe, it } from 'mocha';
import { expect } from 'chai';
import $ from 'jquery';
import sinon from 'sinon';

describe('App after loading', function () {

    beforeEach(function () {
        this.clock = sinon.useFakeTimers(new Date(2015, 10, 25, 12).getTime());
        this.server = createServer();
        this.app = createApp();
        this.app.fetchForecastData();
        this.server.respond();
    });

    afterEach(function () {
        this.clock.restore();
        this.server.restore();
    });

    describe('interacting with the scale', function () {

        describe('specifically metric', function () {

            beforeEach(function () {
                this.$metric = $('.js-metric');
                domEvent('click', this.$metric[0]);
            });

            it('should add the active class to it', function () {
                expect(this.$metric.hasClass('active')).to.be.true;
            });

            it('should result in only one active class', function () {
                expect($('.scale-button.active').length).to.equal(1);
            });

            it('should change the day\'s temperatures to metric', function () {
                var test = $('.js-dayHighTemperature').first().text();
                var actual = getScaledTemperature('metric', this.app.days.models[0].get('high')) + '°';
                expect(test).to.equal(actual);
            });

            it('should change the hours temperatures to metric', function () {
                var test = $('.js-hourTemperature').first().text();
                var actual = getScaledTemperature('metric', this.app.hours.byDay(this.app.appState.get('day')).models[0].get('temperature')) + '°';
                expect(test).to.equal(actual);
            });

            it('should change the day statistics temperatures to metric', function () {
                var test = $('.js-dayStatisticsHigh').text();
                var day = this.app.days.findWhere({day: this.app.appState.get('day')});
                var actual = getScaledTemperature('metric', day.get('high')) + '°C';
                expect(test).to.equal(actual);
            });

            it('should change the hour statistics temperatures to metric', function () {
                domEvent('click', $('.js-hourBar').first()[0]);
                var test = $('.js-hourStatisticsTemperature').text();
                var actual = getScaledTemperature('metric', this.app.hours.byDay(this.app.appState.get('day')).models[0].get('temperature')) + '°C';
                expect(test).to.equal(actual);
            });

        });

    });

});
