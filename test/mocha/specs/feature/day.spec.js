import {createServer, createApp} from '../../helpers';
import {getScaledTemperature} from '../../../../javascript/util/temperature';
// import { describe, it } from 'mocha';
import {expect} from 'chai';
import $ from 'jquery';
import sinon from 'sinon';

describe('App after loading', () => {
    let clock, server, app;
    beforeEach(() => {
        clock = sinon.useFakeTimers(new Date(2015, 10, 25, 12).getTime());
        server = createServer();
        app = createApp();
        app.fetchForecastData();
        server.respond();
    });
    afterEach(() => {
        clock.restore();
        server.restore();
    });
    describe('interacting with a day', () => {
        let $clickedDay;
        beforeEach(() => {
            $clickedDay = $('.js-day').last().click();
        });
        it('should update the app state model', () => {
            expect(app.appState.get('day')).to.equal(1);
        });
        it('should add the active class to it', () => {
            expect($clickedDay.hasClass('is-active')).to.be.true;
        });
        it('should result in only one active class', () => {
            expect($('.day.is-active').length).to.equal(1);
        });
        it('should update the chart with the day\'s hours', () => {
            const daysHours = app.hours.byDay(app.appState.get('day'));
            $('.js-hourTemperature').each((index, element) => {
                const temperature = getScaledTemperature(app.appState.get('scale'), daysHours.models[index].get('temperature'));
                expect(temperature).to.equal(element.textContent.slice(0, -1));
            });
        });
        it('should update the sidebar with the day\'s statistics', () => {
            const dayModel = app.days.findWhere({day: app.appState.get('day')});
            const statsDayText = $('.js-statistics').children().first().text().trim();
            const expected = `${dayModel.get('weekday')}, ${dayModel.get('monthname')} ${dayModel.get('day')}`;
            expect(expected).to.equal(statsDayText);
        });
    });
});
