import 'es5-shim';
import 'babel-polyfill';
import './util/leak_jquery';
import AppView from './app';
import AppRouter from './router';
import AppState from './models/app';
import Days from './collections/days';
import Hours from './collections/hours';
import Backbone from 'backbone';
import $ from 'jquery';
import 'bootstrap/dist/js/umd/util';
import 'bootstrap/dist/js/umd/alert';
import 'bootstrap/dist/js/umd/button';

$.ajaxSetup({cache: false});

const appState = new AppState();
const appRouter = new AppRouter({appState}); // eslint-disable-line no-unused-vars
const app = new AppView({
    el: $('.js-weatherApp'),
    days: new Days(),
    hours: new Hours(),
    appState
});
Backbone.history.start({/* pushState: true */});
app.fetchForecastData();
