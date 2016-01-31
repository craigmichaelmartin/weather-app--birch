define(function (require) {
    'use strict';

    var DayModel = require('models/day');

    describe('Day model', function () {

        it('should be defined', function () {
            expect(DayModel).not.to.be.undefined;
        });

        describe('the parse function', function () {

            it('should parse values correctly', function () {
                var parsed = DayModel.prototype.parse(Helpers.Fixtures.dailyGeo.forecast.simpleforecast.forecastday[0]);
                DayModel.prototype.defaultKeys.forEach(function (key) {
                    expect(parsed[key]).not.to.be.undefined;
                });
            });

        });

        describe('the buildUrl function', function () {

            it('should correctly handle no zip', function () {
                expect(DayModel.prototype.buildUrl()).to.equal('http://api.wunderground.com/api/3f6df2a3f0916b99/hourly/q/autoip.json');
            });

            it('should correctly handle a zip', function () {
                expect(DayModel.prototype.buildUrl(44024)).to.equal('http://api.wunderground.com/api/3f6df2a3f0916b99/hourly/q/44024.json');
            });

        });
    });
});
