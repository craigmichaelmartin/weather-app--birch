define([
    'views/view',
    'text!templates/day_statistics.html',
    'text!templates/hour_statistics.html',
    'handlebarsHelpers',
    'underscore'
], function (View, dayTemplate, hourTemplate, Handlebars, _) {

    'use strict';

    var StatisticsView = View.extend({

        initialize: function (options) {
            options = options || {};
            this.appState = options.appState;
            this.hours = options.hours;
            this.days = options.days;
            this.listenTo(this.appState, 'dataReady', this.render);
            this.listenTo(this.appState, 'change:day', this.showDay);
            this.listenTo(this.appState, 'change:hour', this.showHour);
            this.listenTo(this.appState, 'change:scale', this.render);
            if (this.appState.get('hour')) {
                this.showHour(this.appState, this.appState.get('hour'));
            } else if (this.appState.get('day')) {
                this.showDay(this.appState, this.appState.get('day'));
            }
        },

        showDay: function (model, day) {
            this.model = this.days.findWhere({day: +day});
            this.template = Handlebars.compile(dayTemplate);
            this.render();
        },

        showHour: function (model, hour) {
            this.model = this.hours.findWhere({day: +this.appState.get('day'), hour: +hour});
            this.template = Handlebars.compile(hourTemplate);
            this.render();
        },

        getTemplateData: function () {
            return _.extend({}, this.model.attributes, this.appState.attributes);
        }

    });

    return StatisticsView;

});
