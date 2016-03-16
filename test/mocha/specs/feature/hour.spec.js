import {createServer, createApp, domEvent} from '../../helpers';
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
    describe('interacting with an hour', () => {
        describe('bar', () => {
            let $clickedHour;
            beforeEach(() => {
                $clickedHour = $('.js-hourBar').last();
                domEvent('click', $clickedHour[0]);
            });
            it('should update the app state model', () => {
                expect(app.appState.get('hour')).to.equal(23);
            });
            it('should add the active class to it', () => {
                expect($clickedHour[0].className.animVal.indexOf('is-active') >= 0).to.be.true;
            });
            it('should result in only one active class', () => {
                expect($('.hourBar.is-active').length).to.equal(1);
            });
            it('should update the sidebar with the hours\'s statistics', () => {
                const statsHourText = $('.js-statistics').children().first().text().trim();
                const expected = 'Friday, September 25 at 11:00pm';
                expect(expected).to.equal(statsHourText);
            });
        });
        describe('time text', () => {
            let $clickedHourText;
            beforeEach(() => {
                $clickedHourText = $('.js-hourTime').last();
                domEvent('click', $clickedHourText[0]);
            });
            it('should update the app state model', () => {
                expect(app.appState.get('hour')).to.equal(23);
            });
            it('should add the active class to it\'s bar', () => {
                const time = $clickedHourText.data('time');
                const el = $(`[data-time="${time}"]`)[0];
                expect(el.className.animVal.indexOf('is-active') >= 0).to.be.true;
            });
            it('should result in only one active class', () => {
                expect($('.hourBar.is-active').length).to.equal(1);
            });
            it('should update the sidebar with the hours\'s statistics', () => {
                const statsHourText = $('.js-statistics').children().first().text().trim();
                const expected = 'Friday, September 25 at 11:00pm';
                expect(expected).to.equal(statsHourText);
            });
        });
        describe('temperature text', () => {
            let $clickedHourText;
            beforeEach(() => {
                $clickedHourText = $('.js-hourTemperature').last();
                domEvent('click', $clickedHourText[0]);
            });
            it('should update the app state model', () => {
                expect(app.appState.get('hour')).to.equal(23);
            });
            it('should add the active class to it\'s bar', () => {
                const time = $clickedHourText.data('time');
                const el = $(`[data-time="${time}"]`)[0];
                expect(el.className.animVal.indexOf('is-active') >= 0).to.be.true;
            });
            it('should result in only one active class', () => {
                expect($('.hourBar.is-active').length).to.equal(1);
            });
            it('should update the sidebar with the hours\'s statistics', () => {
                const statsHourText = $('.js-statistics').children().first().text().trim();
                const expected = 'Friday, September 25 at 11:00pm';
                expect(expected).to.equal(statsHourText);
            });
        });
    });
});
