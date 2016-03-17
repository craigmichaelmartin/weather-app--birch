import {getScaledTemperatureDegree, getScaledTemperatureDegreeUnit} from '../../../../../javascript/util/temperature.js';
import {expect} from 'chai';

describe('get scaled temperature with degree', () => {
    it('should return english when passed in english and asked for english', () => {
        expect(getScaledTemperatureDegree('english', 32)).to.eql('32&deg;');
    });
    it('should return english to x digits when passed in english and asked for english to x digits', () => {
        expect(getScaledTemperatureDegree('english', 32, {toFixed: 2})).to.eql('32.00&deg;');
    });
    it('should return metric when passed in english and asked for metric', () => {
        expect(getScaledTemperatureDegree('metric', 32)).to.eql('0&deg;');
    });
    it('should return metric to x digits when passed in english and asked for metric to x digits', () => {
        expect(getScaledTemperatureDegree('metric', 32, {toFixed: 2})).to.eql('0.00&deg;');
    });
    it('should throw an exception if scale is not either english or spanish', () => {
        expect(getScaledTemperatureDegree.bind(null, 'kelvin', 0, {toFixed: 2})).to.throw(/Cannot convert to scale "kelvin"/);
    });
});

describe('get scaled temperature with degree and unit', () => {
    it('should return english when passed in english and asked for english', () => {
        expect(getScaledTemperatureDegreeUnit('english', 32)).to.eql('32&deg;F');
    });
    it('should return english to x digits when passed in english and asked for english to x digits', () => {
        expect(getScaledTemperatureDegreeUnit('english', 32, {toFixed: 2})).to.eql('32.00&deg;F');
    });
    it('should return metric when passed in english and asked for metric', () => {
        expect(getScaledTemperatureDegreeUnit('metric', 32)).to.eql('0&deg;C');
    });
    it('should return metric to x digits when passed in english and asked for metric to x digits', () => {
        expect(getScaledTemperatureDegreeUnit('metric', 32, {toFixed: 2})).to.eql('0.00&deg;C');
    });
    it('should throw an exception if scale is not either english or spanish', () => {
        expect(getScaledTemperatureDegreeUnit.bind(null, 'kelvin', 0, {toFixed: 2})).to.throw(/Cannot convert to scale "kelvin"/);
    });
});
