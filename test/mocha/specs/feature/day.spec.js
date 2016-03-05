import { createServer, createApp } from '../../helpers';
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

    describe('interacting with a day', function () {

        beforeEach(function () {
            this.$clickedDay = $('.js-day').last().click();
        });

        it('should update the app state model', function () {
            expect(this.app.appState.get('day')).to.equal(1);
        });

        it('should add the active class to it', function () {
            expect(this.$clickedDay.hasClass('is-active')).to.be.true;
        });

        it('should result in only one active class', function () {
            expect($('.day.is-active').length).to.equal(1);
        });

        it('should update the chart with the day\'s hours', function () {
            var daysHours = this.app.hours.byDay(this.app.appState.get('day'));
            $('.js-hourTemperature').each(function (index, element) {
                var temperature = getScaledTemperature(this.app.appState.get('scale'), daysHours.models[index].get('temperature'));
                expect(temperature).to.equal(element.textContent.slice(0, -1));
            }.bind(this));
        });

        it('should update the sidebar with the day\'s statistics', function () {
            var dayModel = this.app.days.findWhere({day: this.app.appState.get('day')});
            var statsDayText = $('.js-statistics').children().first().text().trim();
            var expected = dayModel.get('weekday') + ', ' + dayModel.get('monthname') + ' ' + dayModel.get('day');
            expect(expected).to.equal(statsDayText);
        });

    });

});
