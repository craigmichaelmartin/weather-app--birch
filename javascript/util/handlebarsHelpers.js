define([
    'util/temperature',
    'util/date',
    'util/length',
    'util/speed',
    'handlebars',
    'underscore',
    'jquery'
], function (tempUtils, dateUtils, lengthUtils, speedUtils, Handlebars, _, $) {

    'use strict';

    Handlebars.registerHelper('temperature', function (scale, englishNumber, options) {
        if (englishNumber === void 0) {
            return 'unavailable';
        }
        var temperatureRaw = tempUtils.getScaledTemperature(scale, englishNumber, options);
        var postfix = '&deg;' + (scale === 'metric' ? 'C' : 'F');
        return new Handlebars.SafeString(temperatureRaw + postfix);
    });

    Handlebars.registerHelper('temperatureNoUnits', function (scale, englishNumber, options) {
        if (englishNumber === void 0) {
            return 'unavailable';
        }
        var temperatureRaw = tempUtils.getScaledTemperature(scale, englishNumber, options);
        return new Handlebars.SafeString(temperatureRaw + '&deg;');
    });

    Handlebars.registerHelper('length', function (scale, englishNumber, options) {
        if (englishNumber === void 0) {
            return 'unavailable';
        }
        var length = lengthUtils.getScaledLength(scale, englishNumber, options);
        return new Handlebars.SafeString(length);
    });

    Handlebars.registerHelper('speed', function (scale, englishNumber, options) {
        if (englishNumber === void 0) {
            return 'unavailable';
        }
        var speed = speedUtils.getScaledSpeed(scale, englishNumber, options);
        var postfix = scale === 'metric' ? ' kph' : ' mph';
        return new Handlebars.SafeString(speed + postfix);
    });

    Handlebars.registerHelper('when', function (scale, weekday, monthname, day, hour) {
        return dateUtils.getDateSentence(scale, weekday, monthname, day, hour);
    });

    // {{#ifCond var1 '==' var2}}
    Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
        switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this); // jshint ignore:line
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    });

    return Handlebars;

});
