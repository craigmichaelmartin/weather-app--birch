var get12HourNotation = function (hours, options) {
    options || (options = {});
    var intHours = parseInt(hours);
    var modHours = intHours % 12 || 12;
    var minutes = ':00';
    var displayHours = (options.hideMinutes ? modHours : (modHours + minutes));
    var ampm = intHours >= 12 ? 'pm' : 'am';
    return displayHours + ampm;
};

var get24HourNotation = function (hours, options) {
    options || (options = {});
    var minutes = ':00';
    var displayHours = (options.hideMinutes ? hours : (hours + minutes)) + '';
    return displayHours;
};

var getScaledTime = function (scale, hours, options) {
    if (scale === 'english') {
        return get12HourNotation(hours, options);
    }
    if (scale === 'metric') {
        return get24HourNotation(hours, options);
    }
    throw 'Cannot convert to scale "' + scale + '"';
};

export {
    get12HourNotation,
    get24HourNotation,
    getScaledTime
};
