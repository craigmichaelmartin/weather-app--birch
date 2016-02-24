import HourModel from '../../../../../javascript/models/hour.js';
import { expect } from 'chai';
import sinon from 'sinon';

const hourlyGeo = require('../../../fixtures/nonspecific_hourly10day.json');

describe('Hours model', function () {

    it('should be defined', function () {
        expect(HourModel).not.to.be.undefined;
    });

    it('should parse values correctly', function () {
        var parsed = HourModel.prototype.parse(hourlyGeo.hourly_forecast[0]); //jscs:ignore
        HourModel.prototype.defaultKeys.forEach(function (key) {
            if (key === 'heatIndex') {
                expect(parsed[key]).to.be.undefined;
            } else {
                expect(parsed[key]).not.to.be.undefined;
            }
        });
    });
});
