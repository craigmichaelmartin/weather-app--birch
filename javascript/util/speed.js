var mphToKph = 1.609344;

var getScaledSpeed = function (scale, englishNumber, options) {
    options || (options = {});
    options.toFixed || (options.toFixed = 0);
    if (scale === 'metric') {
        return (+englishNumber * mphToKph).toFixed(options.toFixed);
    }
    return (+englishNumber).toFixed(options.toFixed);
};

var getScaledSpeedUnit = function (scale, englishNumber, options) {
    if (englishNumber === void 0) {
        return 'unavailable';
    }
    return getScaledSpeed(scale, englishNumber, options) + (scale === 'metric' ? 'kph' : 'mph');
};

export {
    mphToKph,
    getScaledSpeed,
    getScaledSpeedUnit
};
