require([
    '../javascript/require-config'
], function () {

    'use strict';

    require([
        'app',
        'router',
        'models/app',
        'collections/days',
        'collections/hours',
        'backbone',
        'jquery',
        'es5shim',
        'bootstrap'
    ], function (AppView, AppRouter, AppState, Days, Hours, Backbone, $) {

        $.ajaxSetup({ cache: false });

        var appState = new AppState();
        var appRouter = new AppRouter({appState: appState});    // jshint ignore:line
        var app = new AppView({
            el: $('.js-weatherApp'),
            days: new Days(),
            hours: new Hours(),
            appState: appState
        });
        Backbone.history.start({/*pushState: true*/});
        app.fetchForecastData();

    });
});
