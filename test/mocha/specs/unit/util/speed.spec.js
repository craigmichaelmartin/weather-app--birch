define(function (require) {
    'use strict';

    var speedUtils = require('util/speed');

    describe('Speed utils', function () {

        describe('get scaled speed', function () {

            it('should return english', function () {
                var speed = speedUtils.getScaledSpeed('english', 10);
                expect(speed).to.eql('10');
            });

            it('should return english to x digits', function () {
                var speed = speedUtils.getScaledSpeed('english', 10, {toFixed: 2});
                expect(speed).to.eql('10.00');
            });

            it('should return metric', function () {
                var speed = speedUtils.getScaledSpeed('metric', 10);
                expect(speed).to.eql('16');
            });

            it('should return metric to x digits', function () {
                var speed = speedUtils.getScaledSpeed('metric', 10, {toFixed: 2});
                expect(speed).to.eql('16.09');
            });

        });

    });

});
