import './util/leak_jquery';
import View from './views/view';
import ScaleView from './components/scale';
import LocationView from './components/location';
import DaysView from './components/days';
import StatisticsView from './components/statistics';
import ChartView from './components/chart';
import AppAlert from './components/alert';
import $ from 'jquery';
import _ from 'underscore';
import 'bootstrap/dist/js/umd/util';
import 'bootstrap/dist/js/umd/alert';
import 'bootstrap/dist/js/umd/button';
import 'es5-shim';

const fs = require('fs');
const path = require('path');
const template = fs.readFileSync(path.join(__dirname, '/templates/app.html'), 'utf8');

class AppView extends View {

    get template() {
        return _.template(template);
    }

    initialize({appState, days, hours}) {
        this.appState = appState;
        this.render();
        this.days = days;
        this.hours = hours;
        this.listenToOnce(this.days, 'sync', this.ensureZip);
        this.listenToOnce(this.appState, 'dataReady', this.loadApp.bind(this));
        this.listenTo(this.appState, 'invalid', this.appStateInvalid);
    }

    // Because of how the wunderground API is set up, days and hours
    // are separate collections and 10 days are retrieved at a time,
    // so fetching is only necessary up front, and on zipcode change.
    fetchForecastData() {
        $.when(
            this.days.fetch(this.appState.attributes),
            this.hours.fetch(this.appState.attributes)
        ).done(() => this.appState.trigger('dataReady'));
    }

    // If no zip is provided, obtain the zip from the ip geo-lookup.
    ensureZip(collection, response) {
        if (!this.appState.get('zip')) {
            this.appState.set('zip', +response.location.zip);
        }
    }

    // Kicks off the presentation of the app.
    loadApp() {
        this.listenTo(this.appState, 'change:zip', this.fetchForecastData);
        this.addConditionClass(this.hours.models[0].attributes.condition);
        this.makeViews();
    }

    // Adds an `is-someCondition` class to the app element.
    addConditionClass(condition) {
        this.$el.addClass(this.getConditionClass(condition));
    }

    // Returns a condition in the set {snowy, rainy, clear, cloudy}
    getConditionClass(condition) {
        if (/snow/i.test(condition)) {
            return 'is-snowy';
        }
        if (/rain|thunderstorm|showers/i.test(condition)) {
            return 'is-rainy';
        }
        if (/clear|sunny/i.test(condition)) {
            return 'is-clear';
        }
        return 'is-cloudy';
    }

    appStateInvalid(model, errors) {
        const defaults = _.defaults(
            {zip: this.appState.get('zip')},
            _.result(this.appState, 'defaults')
        );
        this.appState.set(defaults);
        const appAlert = new AppAlert({
            el: '.js-alerts',
            errors
        });
        appAlert.render();
    }

    // Kicks off the views that comprise the app.
    makeViews() {
        this.scaleView = new ScaleView({
            el: $('.js-scaleView'),
            appState: this.appState
        });
        this.locationView = new LocationView({
            el: $('.js-location'),
            appState: this.appState,
            currentHour: this.hours.models[0]
        });
        this.daysView = new DaysView({
            el: $('.js-days'),
            days: this.days,
            appState: this.appState
        });
        this.chart = new ChartView({
            el: $('.js-chart'),
            hours: this.hours,
            appState: this.appState
        });
        this.statisticsView = new StatisticsView({
            el: $('.js-statistics'),
            appState: this.appState,
            days: this.days,
            hours: this.hours
        });
    }
}

export default AppView;
