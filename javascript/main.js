import AppView from './app';
import AppRouter from './router';
import AppState from './models/app';
import Days from './collections/days';
import Hours from './collections/hours';
import Backbone from 'backbone';
import $ from 'jquery';
import 'es5-shim';
import 'bootstrap';

$.ajaxSetup({cache: false});

const appState = new AppState();
const appRouter = new AppRouter({appState: appState}); // jshint ignore:line
const app = new AppView({
    el: $('.js-weatherApp'),
    days: new Days(),
    hours: new Hours(),
    appState
});
Backbone.history.start({/* pushState: true */});
app.fetchForecastData();
