import HourModel from '../../../../../javascript/models/hour.js';
import {expect} from 'chai';

const hourlyGeo = require('../../../fixtures/nonspecific_hourly10day.json');

describe('Hours model', () => {
    it('should be defined', () => {
        expect(HourModel).not.to.be.undefined;
    });
    it('should parse values correctly', () => {
        const parsed = HourModel.prototype.parse(hourlyGeo.hourly_forecast[0]); // jscs:ignore
        HourModel.prototype.defaultKeys.forEach((key) => {
            if (key === 'heatIndex') {
                expect(parsed[key]).to.be.undefined;
            } else {
                expect(parsed[key]).not.to.be.undefined;
            }
        });
    });
});
