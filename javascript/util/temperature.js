define([
], function () {

    'use strict';

    var getScaledTemperature = function (scale, englishNumber, options) {
        options || (options = {});
        options.toFixed || (options.toFixed = 0);
        if (scale === 'english') {
            return (+englishNumber).toFixed(options.toFixed);
        }
        if (scale === 'metric') {
            return ((englishNumber - 32) * 5 / 9).toFixed(options.toFixed);
        }
        throw 'Cannot convert to scale "' + scale + '"';
    };

    return {
        getScaledTemperature: getScaledTemperature
    };

});
