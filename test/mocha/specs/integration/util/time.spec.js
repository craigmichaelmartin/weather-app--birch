import {getScaledTime} from '../../../../../javascript/util/time.js';
// import { describe, it } from 'mocha';
import {expect} from 'chai';

describe('Time util', () => {
    const hours = [
        '0', '1', '2', '3', '4', '5', '6', '7',
        '8', '9', '10', '11', '12', '13', '14', '15',
        '16', '17', '18', '19', '20', '21', '22', '23'
    ];
    const hours12Notation = [
        '12:00am', '1:00am', '2:00am', '3:00am', '4:00am', '5:00am', '6:00am', '7:00am',
        '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm',
        '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm', '10:00pm', '11:00pm'
    ];
    const hours12NotationNoMinutes = [
        '12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am',
        '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm',
        '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'
    ];
    describe('get scaled time', () => {
        describe('for english', () => {
            describe('with no options', () => {
                it('should return times from string hour', () => {
                    hours.forEach((hour, index) => {
                        expect(getScaledTime('english', hour)).to.equal(hours12Notation[index]);
                    });
                });
                it('should return times from number hour', () => {
                    hours.forEach((hour, index) => {
                        expect(getScaledTime('english', index)).to.equal(hours12Notation[index]);
                    });
                });
            });
            describe('with option to hide minutes', () => {
                it('should return times from string hour', () => {
                    hours.forEach((hour, index) => {
                        expect(getScaledTime('english', hour, {hideMinutes: true})).to.equal(hours12NotationNoMinutes[index]);
                    });
                });
                it('should return times from number hour', () => {
                    hours.forEach((hour, index) => {
                        expect(getScaledTime('english', hour, {hideMinutes: true})).to.equal(hours12NotationNoMinutes[index]);
                    });
                });
            });
        });
        describe('for metric', () => {
            describe('with no options', () => {
                it('should return times from string hour', () => {
                    hours.forEach((hour) => {
                        expect(getScaledTime('metric', hour)).to.equal(`${hour}:00`);
                    });
                });
                it('should return times from number hour', () => {
                    hours.forEach((hour, index) => {
                        expect(getScaledTime('metric', index)).to.equal(`${hour}:00`);
                    });
                });
            });
            describe('with option to hide minutes', () => {
                it('should return times from string hour', () => {
                    hours.forEach((hour) => {
                        expect(getScaledTime('metric', hour, {hideMinutes: true})).to.equal(hour);
                    });
                });
                it('should return times from number hour', () => {
                    hours.forEach((hour, index) => {
                        expect(getScaledTime('metric', index, {hideMinutes: true})).to.equal(hour);
                    });
                });
            });
        });
    });
});
