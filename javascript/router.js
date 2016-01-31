define([
    'backbone',
    'util/date',
    'util/time',
    'jquery'
], function (Backbone, dateUtils, timeUtils, $) {

    'use strict';

    var InsightRouter = Backbone.Router.extend({

        routes: {
            '': 'no-op',
            '(:zip)(/:day)(/:hour)(/:scale)': 'setValues'
        },

        initialize: function (options) {
            this.appState = options.appState;
            // As application state chages, the url and periphery are updated
            this.appState.on('change', this.updatePeripheralsWithState.bind(this));
        },

        setValues: function (zip, day, hour, scale) {
            this.appState.set(this.getValues(zip, day, hour, scale), {validate: true});
        },

        getValues: function (zip, day, hour, scale) {
            return {
                zip: +zip,
                day: +day || new Date().getDate(),
                hour: hour && $.isNumeric(hour) ? +hour : scale && $.isNumeric(scale) ? +scale : void 0,
                scale: scale ? scale : hour && !$.isNumeric(hour) ? hour : day && !$.isNumeric(day) ? day : 'english'
            };
        },

        updatePeripheralsWithState: function () {
            this.navigate(this.getUrl());
            document.title = this.getTitle();
        },

        getUrl: function () {
            return '' + this.appState.get('zip') +
                   '/' + this.appState.get('day') +
                   (this.appState.get('hour') === void 0 ? '' : ('/' + this.appState.get('hour'))) +
                   '/' + this.appState.get('scale');
        },

        getTitle: function () {
            var now = new Date();
            var month = now.getMonth() + 1;
            var day = now.getDate();
            var appStateDay = this.appState.get('day');
            if (appStateDay < day) {
                month = month + 1;
            }
            var baseTitle = 'Weather for ' + this.appState.get('zip');
            var scale = this.appState.get('scale');
            var dateTitle = ' on ' + dateUtils.getScaledShortDate(scale, month, appStateDay);
            var hour = this.appState.get('hour');
            var hourTitle = (hour === void 0) ? '' : ' at ' + timeUtils.getScaledTime(scale, hour);
            return baseTitle + dateTitle + hourTitle;
        }

    });

    return InsightRouter;

});
