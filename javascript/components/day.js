import View from '../views/view';
import {getScaledTemperatureDegree} from '../util/temperature';
import $ from 'jquery';
import _ from 'underscore';

const fs = require('fs');
const path = require('path');
const template = fs.readFileSync(path.join(__dirname, '/../templates/day.html'), 'utf8');

class DayView extends View {

    get template() {
        return _.template(template);
    }

    get events() {
        return {
            'click .day': 'loadDay'
        };
    }

    initialize({model, appState}) {
        this.model = model;
        this.appState = appState;
    }

    deleteViewAndModel() {
        this.model.destroy();
        this.deleteView();
    }

    deleteView() {
        this.remove();
        this.unbind();
    }

    loadDay(ev) {
        $('.day.is-active').removeClass('is-active');
        $(ev.currentTarget).addClass('is-active');
        this.appState.attributes.hour = void 0;
        this.appState.set('day', this.model.get('day'));
    }

    getTemplateData() {
        return _.extend({
            activeClass: this.appState.get('day') === this.model.get('day') ? 'is-active' : '',
            highTemp: getScaledTemperatureDegree(this.appState.get('scale'), this.model.get('high')),
            lowTemp: getScaledTemperatureDegree(this.appState.get('scale'), this.model.get('low'))
        }, this.model.attributes);
    }

}

export default DayView;
