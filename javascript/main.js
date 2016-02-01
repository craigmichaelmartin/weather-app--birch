import AppView from './app';
import AppRouter from './router';
import AppState from './models/app';
import Days from './collections/days';
import Hours from './collections/hours';
import Backbone from 'backbone';
import $ from 'jquery';
import es from 'es5-shim';
import bootstrap from 'bootstrap';

$.ajaxSetup({ cache: false });

var appState = new AppState();
var appRouter = new AppRouter({appState: appState}); // jshint ignore:line
var app = new AppView({
    el: $('.js-weatherApp'),
    days: new Days(),
    hours: new Hours(),
    appState: appState
});
Backbone.history.start({/*pushState: true*/});
app.fetchForecastData();
