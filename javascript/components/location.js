define([
    'views/view',
    'text!templates/location.html',
    'handlebarsHelpers',
    'underscore'
], function (View, template, Handlebars, _) {

    'use strict';

    var LocationView = View.extend({

        template: Handlebars.compile(template),

        events: {
            'click .js-display': 'showEditMode',
            'click .js-zip-marker': 'showEditMode',
            'blur .js-edit': 'updateZipOrCancel',
            'keyup .js-edit': 'validateZip'
        },

        initialize: function (options) {
            options = options || {};
            this.model = options.appState;
            this.currentHour = options.currentHour;
            this.render();
            this.listenTo(this.model, 'change:zip', this.indicateLoading);
            this.listenTo(this.model, 'dataReady', this.render);
            this.listenTo(this.model, 'change:scale', this.render);
            this.listenTo(this.model, 'invalid', this.flagInvalidZip);
        },

        indicateLoading: function () {
            this.$('.js-spinner').show();
        },

        flagInvalidZip: function (e) {
            this.$edit.addClass('is-invalid');
        },

        flagValidZip: function (e) {
            this.$edit.removeClass('is-invalid');
        },

        getTemplateData: function () {
            return _.extend({}, this.model.attributes, this.currentHour.attributes);
        },

        updateZipOrCancel: function () {
            var zip = +this.$edit.val();
            if (zip === this.model.get('zip')) {
                this.render();
            }
            if (!this.model.set({zip: zip}, {validate: true})) {
                this.render();
            }
        },

        validateZip: function () {
            if (!this.model.validate({zip: +this.$edit.val()})) {
                this.flagValidZip();
            } else {
                this.flagInvalidZip();
            }
        },

        showEditMode: function () {
            this.$display.hide();
            this.$edit.show().focus().val(this.model.get('zip'));
        },

        afterRender: function () {
            this.cacheSelectors();
        },

        cacheSelectors: function () {
            this.$edit = this.$('.js-edit');
            this.$display = this.$('.js-display');
        }

    });

    return LocationView;

});
