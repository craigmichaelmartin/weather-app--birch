import {getDeltaDate, getScaledShortDate} from '../../../../../javascript/util/date.js';
import {expect} from 'chai';

describe('Date util', () => {
    describe('get delta date', () => {
        it('should return tomorrow\'s date', () => {
            const tomorrow = getDeltaDate(new Date(2015, 11, 25), 1);
            expect(tomorrow).to.eql(new Date(2015, 11, 26));
        });
        it('should return N date\'s out', () => {
            const n = 3;
            const future = getDeltaDate(new Date(2015, 11, 25), n);
            expect(future).to.eql(new Date(2015, 11, 28));
        });
        it('should correctly wrap end of month', () => {
            const tomorrow = getDeltaDate(new Date(2015, 9, 31), 1);
            expect(tomorrow).to.eql(new Date(2015, 10, 1));
        });
        it('should correctly wrap end of month and year', () => {
            const tomorrow = getDeltaDate(new Date(2015, 11, 31), 1);
            expect(tomorrow).to.eql(new Date(2016, 0, 1));
        });
    });
    describe('get scaled short date', () => {
        it('should return english format', () => {
            const shortDate = getScaledShortDate('english', '12', '25');
            expect(shortDate).to.eql('12/25');
        });
        it('should return metric format', () => {
            const shortDate = getScaledShortDate('metric', '12', '25');
            expect(shortDate).to.eql('25/12');
        });
        it('should raise an error for invalid scale', () => {
            const partial = getScaledShortDate.bind(null, 'kelvin', '12', '25');
            expect(partial).to.throw(/Cannot convert to scale "kelvin"/);
        });
    });
});
