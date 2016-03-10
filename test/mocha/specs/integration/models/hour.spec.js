import HourModel from '../../../../../javascript/models/hour.js';
// import { describe, it } from 'mocha';
import {expect} from 'chai';

const hourlyGeo = require('../../../fixtures/nonspecific_hourly10day.json');

describe('Hours model', () => {
    it('should be defined', () => {
        expect(HourModel).not.to.be.undefined;
    });
    describe('after being initialized', () => {
        let hour;
        beforeEach(() => {
            hour = new HourModel();
        });
        it('should parse values correctly', () => {
            const parsed = hour.parse(hourlyGeo.hourly_forecast[0]); // jscs:ignore
            hour.defaultKeys.forEach((key) => {
                if (key === 'heatIndex') {
                    expect(parsed[key]).to.be.undefined;
                } else {
                    expect(parsed[key]).not.to.be.undefined;
                }
            });
        });
    });
});
