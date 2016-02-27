import App from '../../javascript/app';
import AppState from '../../javascript/models/app';
import DaysCollection from '../../javascript/collections/days';
import HoursCollection from '../../javascript/collections/hours';
import sinon from 'sinon';

const fixtures = {
    dailyGeo: require('./fixtures/nonspecific_forecast10day.json'),
    hourlyGeo: require('./fixtures/nonspecific_hourly10day.json'),
};

const validResponse = function (responseText) {
    return [
        200,
        {'Content-Type': 'application/json'},
        JSON.stringify(responseText)
    ];
};

const createServer = function () {
    var server = sinon.fakeServer.create();
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
            zip: undefined,
            day: undefined,
            hour: undefined,
            scale: undefined
        }),
        el: $('body')
    });
};

export {
    fixtures,
    createServer,
    createApp
};
