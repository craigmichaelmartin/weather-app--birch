define([
    '../../test/mocha/fixtures/nonspecific_forecast10day',
    '../../test/mocha/fixtures/nonspecific_hourly10day',
    'app',
    'models/app',
    'collections/days',
    'collections/hours'
], function (NonspecificDailyFixture, NonspecificHourlyFixture,
            App, AppState, DaysCollection, HoursCollection) {

    'use strict';

    var Helpers = {};

    Helpers.validResponse = function (responseText) {
        return [
            200,
            {'Content-Type': 'application/json'},
            JSON.stringify(responseText)
        ];
    };

    Helpers.Fixtures = {
        dailyGeo: NonspecificDailyFixture,
        hourlyGeo: NonspecificHourlyFixture
    };

    Helpers.createServer = function () {
        var server = sinon.fakeServer.create();
        server.respondWith(
            'GET',
            /api\.wunderground\.com\/api\/3f6df2a3f0916b99\/.*forecast10day\/q/,
            Helpers.validResponse(Helpers.Fixtures.dailyGeo)
        );
        server.respondWith(
            'GET',
            /api\.wunderground\.com\/api\/3f6df2a3f0916b99\/hourly10day\/q/,
            Helpers.validResponse(Helpers.Fixtures.hourlyGeo)
        );
        return server;
    };

    Helpers.createApp = function () {
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

    return Helpers;

});
