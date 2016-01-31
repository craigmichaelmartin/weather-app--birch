define([
    'views/view',
    'text!templates/day.html',
    'handlebars',
    'underscore',
    'jquery'
], function (View, template, Handlebars, _, $) {

    'use strict';

    var DayView = View.extend({

        template: Handlebars.compile(template),

        events: {
            'click .day': 'loadDay'
        },

        initialize: function (options) {
            this.model = options.model;
            this.appState = options.appState;
        },

        deleteViewAndModel: function () {
            this.model.destroy();
            this.deleteView();
        },

        deleteView: function () {
            this.remove();
            this.unbind();
        },

        loadDay: function (ev) {
            $('.day.is-active').removeClass('is-active');
            $(ev.currentTarget).addClass('is-active');
            this.appState.attributes.hour = void 0;
            this.appState.set('day', this.model.get('day'));
        },

        getTemplateData: function () {
            return _.extend({
                scale: this.appState.get('scale'),
                isActive: this.appState.get('day') === this.model.get('day')
            }, this.model.attributes);
        }

    });

    return DayView;

});
