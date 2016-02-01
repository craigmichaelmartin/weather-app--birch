import Backbone from 'backbone';

class BaseView extends Backbone.View {

    close() {
        this.trigger('close');
        this.remove();
        this.unbind();
        this.stopListening();
        // Views should define this in their extend declaration
        this.onClose && this.onClose();
        return this;
    }

    render() {
        this.beforeRender && this.beforeRender();
        this.$el.empty().append(this.template(this.getTemplateData()));
        this.afterRender && this.afterRender();
        return this;
    }

    getTemplateData() {
        return this.model && this.model.attributes || {};
    }

}

export default BaseView;
