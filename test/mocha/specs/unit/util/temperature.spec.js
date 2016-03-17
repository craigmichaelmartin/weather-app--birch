import {getScaledTemperature} from '../../../../../javascript/util/temperature.js';
import {expect} from 'chai';

describe('get scaled temperature', () => {
    it('should return english when passed in english and asked for english', () => {
        expect(getScaledTemperature('english', 32)).to.eql('32');
    });
    it('should return english to x digits when passed in english and asked for english to x digits', () => {
        expect(getScaledTemperature('english', 32, {toFixed: 2})).to.eql('32.00');
    });
    it('should return metric when passed in english and asked for metric', () => {
        expect(getScaledTemperature('metric', 32)).to.eql('0');
    });
    it('should return metric to x digits when passed in english and asked for metric to x digits', () => {
        expect(getScaledTemperature('metric', 32, {toFixed: 2})).to.eql('0.00');
    });
    it('should throw an exception if scale is not either english or spanish', () => {
        expect(getScaledTemperature.bind(null, 'kelvin', 0, {toFixed: 2})).to.throw(/Cannot convert to scale "kelvin"/);
    });
});
