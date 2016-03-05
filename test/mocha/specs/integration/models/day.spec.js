import DayModel from '../../../../../javascript/models/day.js';
//import { describe, it } from 'mocha';
import { expect } from 'chai';

const dailyGeo = require('../../../fixtures/nonspecific_forecast10day.json');

describe('Day model', function () {

    it('should be defined', function () {
        expect(DayModel).not.to.be.undefined;
    });

    describe('after being initialized', function () {

        beforeEach(function () {
            this.day = new DayModel();
        });

        describe('the parse function', function () {

            it('should parse values correctly', function () {
                var parsed = this.day.parse(dailyGeo.forecast.simpleforecast.forecastday[0]);
                this.day.defaultKeys.forEach(function (key) {
                    expect(parsed[key]).not.to.be.undefined;
                });
            });

        });

        describe('the buildUrl function', function () {

            it('should correctly handle no zip', function () {
                expect(this.day.buildUrl()).to.equal('http://api.wunderground.com/api/3f6df2a3f0916b99/hourly/q/autoip.json');
            });

            it('should correctly handle a zip', function () {
                expect(this.day.buildUrl(44024)).to.equal('http://api.wunderground.com/api/3f6df2a3f0916b99/hourly/q/44024.json');
            });

        });

    });
});
