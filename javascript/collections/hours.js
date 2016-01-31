define([
    'collections/collection',
    'models/hour'
], function (Collection, Hour) {

    'use strict';

    var Hours = Collection.extend({

        model: Hour,

        buildUrl: function (zip) {
            // I would rather not get the full hourly forcast for all 10 days,
            // and instead as needed, but the rate limit and api design push me toward this path.
            return 'http://api.wunderground.com/api/3f6df2a3f0916b99/hourly10day/q/' + (zip || 'autoip') + '.json';
        },

        fetch: function (options) {
            options.url = this.buildUrl(options.zip);
            // If not allowing cors, this line would be needed.
            // options.dataType = "jsonp";
            return Collection.prototype.fetch.call(this, options);
        },

        parse: function (response) {
            return response.hourly_forecast; // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
        },

        byDay: function (day) {
            return new Hours(this.filter(function (model) {
                return model.get('day') === day;
            }));
        },

        comparator: 'hour'

    });

    return Hours;

});
