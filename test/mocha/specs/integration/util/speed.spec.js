import {getScaledSpeedUnit} from '../../../../../javascript/util/speed.js';
import {expect} from 'chai';

describe('Speed utils', () => {
    describe('get scaled speed', () => {
        it('should return english', () => {
            const speed = getScaledSpeedUnit('english', 10);
            expect(speed).to.eql('10mph');
        });
        it('should return english to x digits', () => {
            const speed = getScaledSpeedUnit('english', 10, {toFixed: 2});
            expect(speed).to.eql('10.00mph');
        });
        it('should return metric', () => {
            const speed = getScaledSpeedUnit('metric', 10);
            expect(speed).to.eql('16kph');
        });
        it('should return metric to x digits', () => {
            const speed = getScaledSpeedUnit('metric', 10, {toFixed: 2});
            expect(speed).to.eql('16.09kph');
        });
    });
});
