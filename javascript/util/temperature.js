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

var getScaledTemperatureDegree = function (scale, englishNumber, options) {
    return getScaledTemperature(scale, englishNumber, options) + '&deg;';
};

var getScaledTemperatureDegreeUnit = function (scale, englishNumber, options) {
    if (englishNumber === void 0) {
        return 'unavailable';
    }
    return getScaledTemperatureDegree(scale, englishNumber, options) + (scale === 'metric' ? 'C' : 'F');
};

export {
    getScaledTemperature,
    getScaledTemperatureDegree,
    getScaledTemperatureDegreeUnit
};
