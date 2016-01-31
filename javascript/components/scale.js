define([
    'views/view',
    'text!templates/scale.html',
    'handlebarsHelpers'
], function (View, template, Handlebars) {

    'use strict';

    var ScaleView = View.extend({

        template: Handlebars.compile(template),

        events: {
            'change .js-scale': 'changeScale'
        },

        initialize: function (options) {
            options = options || {};
            this.model = options.appState;
            this.render();
        },

        changeScale: function () {
            var scale = this.model.get('scale') === 'english' ? 'metric' : 'english';
            this.model.set('scale', scale);
        }

    });

    return ScaleView;

});
