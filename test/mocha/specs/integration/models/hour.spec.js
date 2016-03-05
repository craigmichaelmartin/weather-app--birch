import HourModel from '../../../../../javascript/models/hour.js';
//import { describe, it } from 'mocha';
import { expect } from 'chai';

const hourlyGeo = require('../../../fixtures/nonspecific_hourly10day.json');

describe('Hours model', function () {

    it('should be defined', function () {
        expect(HourModel).not.to.be.undefined;
    });

    describe('after being initialized', function () {

        beforeEach(function () {
            this.hour = new HourModel();
        });

        it('should parse values correctly', function () {
            var parsed = this.hour.parse(hourlyGeo.hourly_forecast[0]); //jscs:ignore
            this.hour.defaultKeys.forEach(function (key) {
                if (key === 'heatIndex') {
                    expect(parsed[key]).to.be.undefined;
                } else {
                    expect(parsed[key]).not.to.be.undefined;
                }
            });
        });

    });
});
