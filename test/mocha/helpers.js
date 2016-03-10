import App from '../../javascript/app';
import AppState from '../../javascript/models/app';
import DaysCollection from '../../javascript/collections/days';
import HoursCollection from '../../javascript/collections/hours';
import sinon from 'sinon';
import $ from 'jquery';

const fixtures = {
    /* eslint-disable global-require */
    dailyGeo: require('./fixtures/nonspecific_forecast10day.json'),
    hourlyGeo: require('./fixtures/nonspecific_hourly10day.json')
    /* eslint-enable global-require */
};

const validResponse = function (responseText) {
    return [
        200,
        {'Content-Type': 'application/json'},
        JSON.stringify(responseText)
    ];
};

const createServer = function () {
    const server = sinon.fakeServer.create();
    server.respondWith(
        'GET',
        /api\.wunderground\.com\/api\/3f6df2a3f0916b99\/.*forecast10day\/q/,
        validResponse(fixtures.dailyGeo)
    );
    server.respondWith(
        'GET',
        /api\.wunderground\.com\/api\/3f6df2a3f0916b99\/hourly10day\/q/,
        validResponse(fixtures.hourlyGeo)
    );
    return server;
};

const createApp = function () {
    return new App({
        hours: new HoursCollection(),
        days: new DaysCollection(),
        appState: new AppState({
            zip: void 0,
            day: void 0,
            hour: void 0,
            scale: void 0
        }),
        el: $('body')
    });
};

const domEvent = function(eventType, el) {
    const ev = document.createEvent('HTMLEvents');
    ev.initEvent(eventType, true, true);
    el.dispatchEvent(ev);
};

export {
    fixtures,
    createServer,
    createApp,
    domEvent
};
