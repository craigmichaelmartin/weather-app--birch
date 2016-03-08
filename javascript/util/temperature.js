const getScaledTemperature = function (scale, englishNumber, options = {}) {
    options.toFixed || (options.toFixed = 0);
    if (scale === 'english') {
        return (+englishNumber).toFixed(options.toFixed);
    }
    if (scale === 'metric') {
        return ((englishNumber - 32) * 5 / 9).toFixed(options.toFixed);
    }
    throw new Error(`Cannot convert to scale "${scale}"`);
};

const getScaledTemperatureDegree = function (scale, englishNumber, options) {
    const temperature = getScaledTemperature(scale, englishNumber, options);
    return `${temperature}&deg;`;
};

const getScaledTemperatureDegreeUnit = function (scale, englishNumber, options) {
    if (englishNumber === void 0) {
        return 'unavailable';
    }
    const temperature = getScaledTemperatureDegree(scale, englishNumber, options);
    return temperature + (scale === 'metric' ? 'C' : 'F');
};

export {
    getScaledTemperature,
    getScaledTemperatureDegree,
    getScaledTemperatureDegreeUnit
};
