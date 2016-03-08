import {getScaledShortDate} from './util/date';
import {getScaledTime} from './util/time';
import $ from 'jquery';
import Backbone from 'backbone';

class AppRouter extends Backbone.Router {

    get routes() {
        return {
            '': 'no-op',
            '(:zip)(/:day)(/:hour)(/:scale)': 'setValues'
        };
    }

    initialize(options) {
        this.appState = options.appState;
        // As application state chages, the url and periphery are updated
        this.appState.on('change', this.updatePeripheralsWithState.bind(this));
    }

    setValues(zip, day, hour, scale) {
        this.appState.set(this.getValues(zip, day, hour, scale), {validate: true});
    }

    getValues(zip, day, hour, scale) {
        return {
            zip: +zip,
            day: +day || new Date().getDate(),
            hour: hour && $.isNumeric(hour) ? +hour : scale && $.isNumeric(scale) ? +scale : void 0,
            scale: scale ? scale : hour && !$.isNumeric(hour) ? hour : day && !$.isNumeric(day) ? day : 'english'
        };
    }

    updatePeripheralsWithState() {
        this.navigate(this.getUrl());
        document.title = this.getTitle();
    }

    getUrl() {
        return `${this.appState.get('zip')}` +
               `/${this.appState.get('day')}` +
               `${this.appState.get('hour') === void 0 ? '' : `/${this.appState.get('hour')}`}` +
               `/${this.appState.get('scale')}`;
    }

    getTitle() {
        const now = new Date();
        const appStateDay = this.appState.get('day');
        const day = now.getDate();
        const month = appStateDay < day
            ? now.getMonth() + 2
            : now.getMonth() + 1;
        const baseTitle = `Weather for ${this.appState.get('zip')}`;
        const scale = this.appState.get('scale');
        const dateTitle = ` on ${getScaledShortDate(scale, month, appStateDay)}`;
        const hour = this.appState.get('hour');
        const hourTitle = hour === void 0
            ? ''
            : ` at ${getScaledTime(scale, hour)}`;
        return baseTitle + dateTitle + hourTitle;
    }

}

export default AppRouter;
