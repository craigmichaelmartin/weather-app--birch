define(function (require) {
    'use strict';

    var dateUtils = require('util/date');

    describe('Date util', function () {

        describe('get delta date', function () {

            it('should return tomorrow\'s date', function () {
                var tomorrow = dateUtils.getDeltaDate(new Date(2015, 11, 25), 1);
                expect(tomorrow).to.eql(new Date(2015, 11, 26));
            });

            it('should return N date\'s out', function () {
                var n = 3;
                var future = dateUtils.getDeltaDate(new Date(2015, 11, 25), n);
                expect(future).to.eql(new Date(2015, 11, 28));
            });

            it('should correctly wrap end of month', function () {
                var tomorrow = dateUtils.getDeltaDate(new Date(2015, 9, 31), 1);
                expect(tomorrow).to.eql(new Date(2015, 10, 1));
            });

            it('should correctly wrap end of month and year', function () {
                var tomorrow = dateUtils.getDeltaDate(new Date(2015, 11, 31), 1);
                expect(tomorrow).to.eql(new Date(2016, 0, 1));
            });

        });

        describe('get scaled short date', function () {

            it('should return english format', function () {
                var shortDate = dateUtils.getScaledShortDate('english', '12', '25');
                expect(shortDate).to.eql('12/25');
            });

            it('should return metric format', function () {
                var shortDate = dateUtils.getScaledShortDate('metric', '12', '25');
                expect(shortDate).to.eql('25/12');
            });

            it('should raise an error for invalid scale', function () {
                var partial = dateUtils.getScaledShortDate.bind(null, 'kelvin', '12', '25');
                expect(partial).to.throw(/Cannot convert to scale "kelvin"/);
            });

        });

    });

});
