import DayModel from '../../../../../javascript/models/day.js';
import {expect} from 'chai';

const dailyGeo = require('../../../fixtures/nonspecific_forecast10day.json');

describe('Day model', () => {
    it('should be defined', () => {
        expect(DayModel).not.to.be.undefined;
    });
    describe('the parse function', () => {
        it('should parse values correctly', () => {
            const parsed = DayModel.prototype.parse(dailyGeo.forecast.simpleforecast.forecastday[0]);
            DayModel.prototype.defaultKeys.forEach((key) => {
                expect(parsed[key]).not.to.be.undefined;
            });
        });
    });
    describe('the buildUrl function', () => {
        it('should correctly handle no zip', () => {
            expect(DayModel.prototype.buildUrl()).to.equal('//api.wunderground.com/api/3f6df2a3f0916b99/hourly/q/autoip.json');
        });
        it('should correctly handle a zip', () => {
            expect(DayModel.prototype.buildUrl(44024)).to.equal('//api.wunderground.com/api/3f6df2a3f0916b99/hourly/q/44024.json');
        });
    });
});
