define(function (require) {
    'use strict';

    var Handlebars = require('handlebars');
    var lengthUtils = require('util/length');

    describe('Handlebars helpers', function () {

        describe('temperature', function () {

            it('should return english when passed in english and asked for english', function () {
                var hopeful = Handlebars.helpers.temperature('english', 32);
                var expected = new Handlebars.SafeString('32&deg;F');
                expect(hopeful).to.eql(expected);
            });

            it('should return english to x digits when passed in english and asked for english to x digits', function () {
                var hopeful = Handlebars.helpers.temperature('english', 32, {toFixed: 2});
                var expected = new Handlebars.SafeString('32.00&deg;F');
                expect(hopeful).to.eql(expected);
            });

            it('should return metric when passed in english and asked for metric', function () {
                var hopeful = Handlebars.helpers.temperature('metric', 32);
                var expected = new Handlebars.SafeString('0&deg;C');
                expect(hopeful).to.eql(expected);
            });

            it('should return metric to x digits when passed in english and asked for metric to x digits', function () {
                var hopeful = Handlebars.helpers.temperature('metric', 32, {toFixed: 2});
                var expected = new Handlebars.SafeString('0.00&deg;C');
                expect(hopeful).to.eql(expected);
            });

        });

        describe('temperatureNoUnits', function () {

            it('should return english when passed in english and asked for english', function () {
                var hopeful = Handlebars.helpers.temperatureNoUnits('english', 32);
                var expected = new Handlebars.SafeString('32&deg;');
                expect(hopeful).to.eql(expected);
            });

            it('should return english to x digits when passed in english and asked for english to x digits', function () {
                var hopeful = Handlebars.helpers.temperatureNoUnits('english', 32, {toFixed: 2});
                var expected = new Handlebars.SafeString('32.00&deg;');
                expect(hopeful).to.eql(expected);
            });

            it('should return metric when passed in english and asked for metric', function () {
                var hopeful = Handlebars.helpers.temperatureNoUnits('metric', 32);
                var expected = new Handlebars.SafeString('0&deg;');
                expect(hopeful).to.eql(expected);
            });

            it('should return metric to x digits when passed in english and asked for metric to x digits', function () {
                var hopeful = Handlebars.helpers.temperatureNoUnits('metric', 32, {toFixed: 2});
                var expected = new Handlebars.SafeString('0.00&deg;');
                expect(hopeful).to.eql(expected);
            });

        });

        describe('length', function () {

            it('should return english when passed in english and asked for english', function () {
                var hopeful = Handlebars.helpers.length('english', 2);
                var expected = new Handlebars.SafeString('2 inches');
                expect(hopeful).to.eql(expected);
            });

            it('should return english for one unit when passed in english and asked for english', function () {
                var hopeful = Handlebars.helpers.length('english', 1);
                var expected = new Handlebars.SafeString('1 inch');
                expect(hopeful).to.eql(expected);
            });

            it('should return english to x digits when passed in english and asked for english to x digits', function () {
                var hopeful = Handlebars.helpers.length('english', 2, {toFixed: 2});
                var expected = new Handlebars.SafeString('2.00 inches');
                expect(hopeful).to.eql(expected);
            });

            it('should return english for one unit to x digits when passed in english and asked for english to x digits', function () {
                var hopeful = Handlebars.helpers.length('english', 1, {toFixed: 2});
                var expected = new Handlebars.SafeString('1.00 inch');
                expect(hopeful).to.eql(expected);
            });

            it('should return metric (mm) when passed in english and asked for metric', function () {
                var hopeful = Handlebars.helpers.length('metric', 1, {metricUnit: 'mm'});
                var expected = new Handlebars.SafeString('254 millimeters');
                expect(hopeful).to.eql(expected);
            });

            it('should return metric (cm) when passed in english and asked for metric', function () {
                var hopeful = Handlebars.helpers.length('metric', 1, {metricUnit: 'cm'});
                var expected = new Handlebars.SafeString('3 centimeters');
                expect(hopeful).to.eql(expected);
            });

            it('should return metric for one unit when passed in english and asked for metric', function () {
                var hopeful = Handlebars.helpers.length('metric', lengthUtils.inchesToCentimeters, {metricUnit: 'cm'});
                var expected = new Handlebars.SafeString('1 centimeter');
                expect(hopeful).to.eql(expected);
            });

            it('should return metric for one unit to x digits when passed in english and asked for metric to x digits', function () {
                var hopeful = Handlebars.helpers.length('metric', lengthUtils.inchesToCentimeters, {metricUnit: 'cm', toFixed: 2});
                var expected = new Handlebars.SafeString('1.00 centimeter');
                expect(hopeful).to.eql(expected);
            });

            it('should return metric to x digits when passed in english and asked for metric to x digits', function () {
                var hopeful = Handlebars.helpers.length('metric', 1, {metricUnit: 'cm', toFixed: 2});
                var expected = new Handlebars.SafeString('2.54 centimeters');
                expect(hopeful).to.eql(expected);
            });

        });

        describe('speed', function () {

            it('should return english when passed in english and asked for english', function () {
                var hopeful = Handlebars.helpers.speed('english', 10);
                var expected = new Handlebars.SafeString('10 mph');
                expect(hopeful).to.eql(expected);
            });

            it('should return metric when passed in english and asked for metric', function () {
                var hopeful = Handlebars.helpers.speed('metric', 10);
                var expected = new Handlebars.SafeString('16 kph');
                expect(hopeful).to.eql(expected);
            });

        });

        describe('when', function () {

            it('should return an english date and time sentence when passed in english components and asked for english', function () {
                var hopeful = Handlebars.helpers.when('english', 'Monday', 'May', '13', '17');
                var expected = 'Monday, May 13 at 5:00pm';
                expect(hopeful).to.eql(expected);
            });

            it('should return a metric style date and time sentence when passed in metric components and asked for metric', function () {
                var hopeful = Handlebars.helpers.when('metric', 'Monday', 'May', '13', '17');
                var expected = 'Monday, 13 May at 17:00';
                expect(hopeful).to.eql(expected);
            });

            it('should return an english date sentence when passed in english components and asked for english', function () {
                var hopeful = Handlebars.helpers.when('english', 'Monday', 'May', '13');
                var expected = 'Monday, May 13';
                expect(hopeful).to.eql(expected);
            });

            it('should return a metric style date sentence when passed in metric components and asked for english', function () {
                var hopeful = Handlebars.helpers.when('english', 'Monday', 'May', '13');
                var expected = 'Monday, May 13';
                expect(hopeful).to.eql(expected);
            });

        });

    });
});
