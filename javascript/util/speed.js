const mphToKph = 1.609344;

const getScaledSpeed = function (scale, englishNumber, {toFixed = 0} = {}) {
    if (scale === 'metric') {
        return (+englishNumber * mphToKph).toFixed(toFixed);
    }
    return (+englishNumber).toFixed(toFixed);
};

const getScaledSpeedUnit = function (scale, englishNumber, options) {
    if (englishNumber === void 0) {
        return 'unavailable';
    }
    const speed = getScaledSpeed(scale, englishNumber, options);
    return speed + (scale === 'metric' ? 'kph' : 'mph');
};

export {
    mphToKph,
    getScaledSpeed,
    getScaledSpeedUnit
};
