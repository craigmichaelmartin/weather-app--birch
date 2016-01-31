define([
    'models/model',
    'util/date',
    'underscore'
], function (Model, dateUtils, _) {

    'use strict';

    var AppState = Model.extend({

        defaults: function () {
            return {
                zip: void 0,
                day: new Date().getDate(),
                hour: void 0,
                scale: 'english'
            };
        },

        scales: ['english', 'metric'],

        zipNotNumeric: 'Zip code must be numeric',
        zipNotLength: 'Zip code must be five digits',
        dayNotNear: 'Day must be within ten days of today',
        hourNeedsDay: 'Day must be selected to choose an hour',
        hourNotValid: 'Hour must be between 0 and 23',
        hourNotValidToday: 'Hour must be after current hour',
        get scaleNotValid() {
            var scales = this.scales.join(', ');
            var lastComma = scales.lastIndexOf(',');
            var readable = scales.substring(0, lastComma) + ' or' + scales.substring(lastComma + 1);
            return 'Scale must be ' + readable;
        },

        validate: function (attrs, options) {
            var errors = [];
            var now = new Date();
            if (!_.isNumber(attrs.zip) || _.isNaN(attrs.zip)) {
                errors.push(this.zipNotNumeric);
            } else if ((attrs.zip < 0) || (attrs.zip.toString().length !== 5)) {
                errors.push(this.zipNotLength);
            }
            if (attrs.day) {
                var dates = [];
                for (var index = 0; index < 10; index++) {
                    dates.push(dateUtils.getDeltaDate(now, index).getDate());
                }
                if (dates.indexOf(attrs.day) === -1) {
                    errors.push(this.dayNotNear);
                }
            }
            if (attrs.hour) {
                if (!attrs.day) {
                    errors.push(this.hourNeedsDay);
                }
                var validHours = _.range(24); //Array.apply(null, {length: 24}).map(Number.call, Number);
                if (validHours.indexOf(attrs.hour) === -1) {
                    errors.push(this.hourNotValid);
                } else if (attrs.day === now.getDate()) {
                    if (validHours.slice(now.getHours()).indexOf(attrs.hour) === -1) {
                        errors.push(this.hourNotValidToday);
                    }
                }
            }
            if (attrs.scale) {
                if (this.scales.indexOf(attrs.scale) === -1) {
                    errors.push(this.scaleNotValid);
                }
            }
            return errors.length ? errors : void 0;
        }

    });

    return AppState;
});
