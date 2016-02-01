define([
], function () {

    'use strict';

    require.config({
        paths: {
            requirejs: '../public/vendor/requirejs/require',
            rjs: '../public/vendor/r.js/dist/r',
            JSONjs: '../public/vendor/JSON-js/json2',
            jquery: '../public/vendor/jquery/dist/jquery',
            backbone: '../public/vendor/backbone/backbone',
            bootstrap: '../public/vendor/bootstrap/dist/js/bootstrap',
            text: '../public/vendor/requirejs-text/text',
            underscore: '../public/vendor/underscore/underscore',
            handlebars: '../public/vendor/handlebars/handlebars',
            handlebarsHelpers: 'util/handlebarsHelpers',
            d3: '../public/vendor/d3/d3',
            es5shim: '../public/vendor/es5-shim/es5-shim'
        }
        shim: {
            jquery: {exports: '$'}
            underscore: {exports: '_'}
            backbone: {deps: ['jquery', 'underscore'], exports: 'Backbone'}
            bootstrap: {deps: ['jquery']}
            handlebars: {exports: 'Handlebars'}
            handlebarsHelpers: {deps: ['handlebars']}
        }
        urlArgs: 'version=0.0.1'
    });

});
