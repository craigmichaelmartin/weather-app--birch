import {getScaledLength, inchesToCentimeters, inchesToMillimeters} from '../../../../../javascript/util/length.js';
import {expect} from 'chai';

describe('Length util', () => {
    describe('get scaled length', () => {
        it('should return english length', () => {
            const length = getScaledLength('english', 5);
            expect(length).to.eql('5 inches');
        });
        it('should return english length for one unit', () => {
            const length = getScaledLength('english', 1);
            expect(length).to.eql('1 inch');
        });
        it('should return english length to x digits ', () => {
            const length = getScaledLength('english', 5, {toFixed: 2});
            expect(length).to.eql('5.00 inches');
        });
        it('should return english length for one unit to x digits', () => {
            const length = getScaledLength('english', 1, {toFixed: 2});
            expect(length).to.eql('1.00 inch');
        });
        it('should return metric (cm) length', () => {
            const length = getScaledLength('metric', 1, {metricUnit: 'cm'});
            expect(length).to.eql('3 centimeters');
        });
        it('should return metric (cm) length to x digits', () => {
            const length = getScaledLength('metric', 1, {metricUnit: 'cm', toFixed: 2});
            expect(length).to.eql('2.54 centimeters');
        });
        it('should return metric (cm) for one unit', () => {
            const length = getScaledLength('metric', inchesToCentimeters, {metricUnit: 'cm'});
            expect(length).to.eql('1 centimeter');
        });
        it('should return metric (cm) length for one unit to x digits', () => {
            const length = getScaledLength('metric', inchesToCentimeters, {metricUnit: 'cm', toFixed: 2});
            expect(length).to.eql('1.00 centimeter');
        });
        it('should return metric (mm) length', () => {
            const length = getScaledLength('metric', 1, {metricUnit: 'mm'});
            expect(length).to.eql('254 millimeters');
        });
        it('should return metric (mm) length to x digits', () => {
            const length = getScaledLength('metric', 1, {metricUnit: 'mm', toFixed: 2});
            expect(length).to.eql('254.00 millimeters');
        });
        it('should return metric (mm) length for one unit', () => {
            const length = getScaledLength('metric', inchesToMillimeters, {metricUnit: 'mm'});
            expect(length).to.eql('1 millimeter');
        });
        it('should return metric (mm) length for one unit to x digits', () => {
            const length = getScaledLength('metric', inchesToMillimeters, {metricUnit: 'mm', toFixed: 2});
            expect(length).to.eql('1.00 millimeter');
        });
        it('should default metric unit to cm', () => {
            const length = getScaledLength('metric', 1);
            expect(length).to.eql('3 centimeters');
        });
    });
});
