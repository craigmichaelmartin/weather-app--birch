var inchesToCentimeters = 0.39370079;
var inchesToMillimeters = inchesToCentimeters * 0.01;

var getScaledLength = function (scale, englishNumber, options) {
    if (englishNumber === void 0) {
        return 'unavailable';
    }
    options || (options = {});
    options.toFixed || (options.toFixed = 0);
    var number, length;
    if (scale === 'english') {
        number = (+englishNumber).toFixed(options.toFixed);
        length = number + ' inch';
        return length + (+number === 1 ? '' : 'es');
    }
    if (scale === 'metric') {
        if (!options.metricUnit || options.metricUnit === 'cm') {
            number = (+englishNumber / inchesToCentimeters).toFixed(options.toFixed);
            length = number + ' centimeter';
        } else {
            number = (+englishNumber / inchesToMillimeters).toFixed(options.toFixed);
            length = number + ' millimeter';
        }
        return length + (+number === 1 ? '' : 's');
    }
    throw 'Cannot convert to scale "' + scale + '"';
};

export {
    getScaledLength,
    inchesToCentimeters,
    inchesToMillimeters
};

