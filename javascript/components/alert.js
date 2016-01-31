define([
    'views/view',
    'text!templates/alert.html',
    'handlebarsHelpers',
    'underscore'
], function (View, template, Handlebars, _) {

    'use strict';

    var AlertView = View.extend({

        template: Handlebars.compile(template),

        getMessage: function (errors) {
            return 'The data provided was invalid. ' + errors.join('. ') + '.';
        },

        initialize: function (options) {
            options = options || {};
            this.errors = options.errors;
            this.render();
        },

        getTemplateData: function () {
            return {
                message: this.getMessage(this.errors)
            };
        }

    });

    return AlertView;

});
