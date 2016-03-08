import {getScaledTime} from './time';

const getDeltaDate = function (date, delta) {
    const dateClone = new Date(date);
    dateClone.setDate(date.getDate() + delta);
    return dateClone;
};

const getScaledShortDate = function (scale, month, day) {
    if (scale === 'english') {
        return `${month}/${day}`;
    }
    if (scale === 'metric') {
        return `${day}/${month}`;
    }
    throw new Error(`Cannot convert to scale "${scale}"`);
};

const getDateSentence = function (scale, weekday, monthname, day, hour) {
    const date = scale === 'metric' ? `${day} ${monthname}` : `${monthname} ${day}`;
    const time = hour == null ? '' : ` at ${getScaledTime(scale, hour)}`;
    return `${weekday}, ${date}${time}`;
};

export {
    getDeltaDate,
    getScaledShortDate,
    getDateSentence
};
