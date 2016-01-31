define([
    'backbone'
], function (Backbone) {
    'use strict';

    var BaseView = Backbone.View.extend({

        close: function () {
            this.trigger('close');
            this.remove();
            this.unbind();
            this.stopListening();
            // Views should define this in their extend declaration
            this.onClose && this.onClose();
            return this;
        },

        render: function () {
            this.beforeRender && this.beforeRender();
            this.$el.empty().append(this.template(this.getTemplateData()));
            this.afterRender && this.afterRender();
            return this;
        },

        getTemplateData: function () {
            return this.model && this.model.attributes || {};
        }

    });

    return BaseView;

});
