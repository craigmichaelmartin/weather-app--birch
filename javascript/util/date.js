import { getScaledTime } from './time';

var getDeltaDate = function (date, delta) {
    var dateClone = new Date(date);
    dateClone.setDate(date.getDate() + delta);
    return dateClone;
};

var getScaledShortDate = function (scale, month, day) {
    if (scale === 'english') {
        return month + '/' + day;
    }
    if (scale === 'metric') {
        return day + '/' + month;
    }
    throw 'Cannot convert to scale "' + scale + '"';
};

var getDateSentence = function (scale, weekday, monthname, day, hour) {
    return weekday + ', ' + (scale === 'metric' ? day + ' ' + monthname : monthname + ' ' + day) + (hour == null ? '' : ' at ' + getScaledTime(scale, hour));
};

export {
    getDeltaDate, 
    getScaledShortDate,
    getDateSentence
};
