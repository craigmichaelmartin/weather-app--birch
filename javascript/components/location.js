import View from '../views/view';
import { getScaledTemperatureDegreeUnit } from '../util/temperature';
import _ from 'underscore';

const fs = require('fs');
const template = fs.readFileSync(__dirname + '/../templates/location.html', 'utf8');

class LocationView extends View {

    get template() {
        return _.template(template);
    }

    get events() {
        return {
            'click .js-display': 'showEditMode',
            'click .js-zip-marker': 'showEditMode',
            'blur .js-edit': 'updateZipOrCancel',
            'keyup .js-edit': 'validateZip'
        };
    }

    initialize(options) {
        options = options || {};
        this.model = options.appState;
        this.currentHour = options.currentHour;
        this.render();
        this.listenTo(this.model, 'change:zip', this.indicateLoading);
        this.listenTo(this.model, 'dataReady', this.render);
        this.listenTo(this.model, 'change:scale', this.render);
        this.listenTo(this.model, 'invalid', this.flagInvalidZip);
    }

    indicateLoading() {
        this.$('.js-spinner').show();
    }

    flagInvalidZip(e) {
        this.$edit.addClass('is-invalid');
    }

    flagValidZip(e) {
        this.$edit.removeClass('is-invalid');
    }

    getTemplateData() {
        return _.extend({}, this.model.attributes, this.currentHour.attributes, {
            temperature: getScaledTemperatureDegreeUnit(this.model.get('scale'), this.currentHour.get('temperature'))
        });
    }

    updateZipOrCancel() {
        var zip = +this.$edit.val();
        if (zip === this.model.get('zip')) {
            this.render();
        }
        if (!this.model.set({zip: zip}, {validate: true})) {
            this.render();
        }
    }

    validateZip() {
        if (!this.model.validate({zip: +this.$edit.val()})) {
            this.flagValidZip();
        } else {
            this.flagInvalidZip();
        }
    }

    showEditMode() {
        this.$display.hide();
        this.$edit.show().focus().val(this.model.get('zip'));
    }

    afterRender() {
        this.cacheSelectors();
    }

    cacheSelectors() {
        this.$edit = this.$('.js-edit');
        this.$display = this.$('.js-display');
    }

}

export default LocationView;
