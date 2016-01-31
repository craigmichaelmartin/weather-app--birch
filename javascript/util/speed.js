define([
], function () {

    'use strict';

    var mphToKph = 1.609344;

    var getScaledSpeed = function (scale, englishNumber, options) {
        options || (options = {});
        options.toFixed || (options.toFixed = 0);
        if (scale === 'metric') {
            return (+englishNumber * mphToKph).toFixed(options.toFixed);
        }
        return (+englishNumber).toFixed(options.toFixed);
    };

    return {
        mphToKph: mphToKph,
        getScaledSpeed: getScaledSpeed
    };

});
