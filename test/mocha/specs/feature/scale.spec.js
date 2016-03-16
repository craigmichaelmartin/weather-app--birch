import {createServer, createApp, domEvent} from '../../helpers';
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
    describe('interacting with the scale', () => {
        describe('specifically metric', () => {
            let $metric;
            beforeEach(() => {
                $metric = $('.js-metric');
                domEvent('click', $metric[0]);
            });
            it('should add the active class to it', () => {
                expect($metric.hasClass('active')).to.be.true;
            });
            it('should result in only one active class', () => {
                expect($('.scale-button.active').length).to.equal(1);
            });
            it('should change the day\'s temperatures to metric', () => {
                const test = $('.js-dayHighTemperature').first().text();
                const actual = getScaledTemperature('metric', app.days.models[0].get('high')) + '°';// eslint-disable-line prefer-template
                expect(test).to.equal(actual);
            });
            it('should change the hours temperatures to metric', () => {
                const test = $('.js-hourTemperature').first().text();
                const actual = getScaledTemperature('metric', app.hours.byDay(app.appState.get('day')).models[0].get('temperature')) + '°';// eslint-disable-line prefer-template
                expect(test).to.equal(actual);
            });
            it('should change the day statistics temperatures to metric', () => {
                const test = $('.js-dayStatisticsHigh').text();
                const day = app.days.findWhere({day: app.appState.get('day')});
                const actual = getScaledTemperature('metric', day.get('high')) + '°C';// eslint-disable-line prefer-template
                expect(test).to.equal(actual);
            });
            it('should change the hour statistics temperatures to metric', () => {
                domEvent('click', $('.js-hourBar').first()[0]);
                const test = $('.js-hourStatisticsTemperature').text();
                const actual = getScaledTemperature('metric', app.hours.byDay(app.appState.get('day')).models[0].get('temperature')) + '°C';// eslint-disable-line prefer-template
                expect(test).to.equal(actual);
            });
        });
    });
});
