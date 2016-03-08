const inchesToCentimeters = 0.39370079;
const inchesToMillimeters = inchesToCentimeters * 0.01;

const getScaledLength = function (scale, englishNumber, options = {}) {
    if (englishNumber === void 0) {
        return 'unavailable';
    }
    options.toFixed || (options.toFixed = 0);
    if (scale === 'english') {
        const number = (+englishNumber).toFixed(options.toFixed);
        const length = `${number} inch`;
        return length + (+number === 1 ? '' : 'es');
    }
    if (scale === 'metric') {
        if (!options.metricUnit || options.metricUnit === 'cm') {
            const number = (+englishNumber / inchesToCentimeters).toFixed(options.toFixed);
            const length = `${number} centimeter`;
            return length + (+number === 1 ? '' : 's');
        }
        const number = (+englishNumber / inchesToMillimeters).toFixed(options.toFixed);
        const length = `${number} millimeter`;
        return length + (+number === 1 ? '' : 's');
    }
    throw new Error(`Cannot convert to scale "${scale}"`);
};

export {
    getScaledLength,
    inchesToCentimeters,
    inchesToMillimeters
};

