const get12HourNotation = function (hours, {hideMinutes} = {}) {
    const intHours = parseInt(hours, 10);
    const modHours = intHours % 12 || 12;
    const minutes = ':00';
    const displayHours = hideMinutes ? modHours : modHours + minutes;
    const ampm = intHours >= 12 ? 'pm' : 'am';
    return displayHours + ampm;
};

const get24HourNotation = function (hours, {hideMinutes} = {}) {
    const minutes = ':00';
    const displayHours = `${hideMinutes ? hours : hours + minutes}`;
    return displayHours;
};

const getScaledTime = function (scale, hours, options) {
    if (scale === 'english') {
        return get12HourNotation(hours, options);
    }
    if (scale === 'metric') {
        return get24HourNotation(hours, options);
    }
    throw new Error(`Cannot convert to scale "${scale}"`);
};

export {
    get12HourNotation,
    get24HourNotation,
    getScaledTime
};
