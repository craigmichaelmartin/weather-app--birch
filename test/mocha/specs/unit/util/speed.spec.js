import {getScaledSpeed} from '../../../../../javascript/util/speed.js';
import {expect} from 'chai';

describe('Speed utils', () => {
    describe('get scaled speed', () => {
        it('should return english', () => {
            const speed = getScaledSpeed('english', 10);
            expect(speed).to.eql('10');
        });
        it('should return english to x digits', () => {
            const speed = getScaledSpeed('english', 10, {toFixed: 2});
            expect(speed).to.eql('10.00');
        });
        it('should return metric', () => {
            const speed = getScaledSpeed('metric', 10);
            expect(speed).to.eql('16');
        });
        it('should return metric to x digits', () => {
            const speed = getScaledSpeed('metric', 10, {toFixed: 2});
            expect(speed).to.eql('16.09');
        });
    });
});
