define([
    'util/time'
], function (timeUtils) {

    'use strict';

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
        return weekday + ', ' + (scale === 'metric' ? day + ' ' + monthname : monthname + ' ' + day) + (hour == null ? '' : ' at ' + timeUtils.getScaledTime(scale, hour));
    };

    return {
        getDeltaDate: getDeltaDate,
        getScaledShortDate: getScaledShortDate,
        getDateSentence: getDateSentence
    };

});
