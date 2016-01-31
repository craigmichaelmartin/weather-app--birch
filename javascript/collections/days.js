define([
    'collections/collection',
    'models/day'
], function (Collection, Day) {

    'use strict';

    var Days = Collection.extend({

        model: Day,

        buildUrl: function (zip) {
            // I would rather not get the full hourly forcast for all 10 days,
            // and instead as needed, but the rate limit and api design push me toward this path.
            // If no zip is provided, use the ip and return geolookup info as well.
            return 'http://api.wunderground.com/api/3f6df2a3f0916b99/' + (zip ? '' : 'geolookup/') + 'forecast10day/q/' + (zip || 'autoip') + '.json';
        },

        fetch: function (options) {
            options.url = this.buildUrl(options.zip);
            // If not allowing cors, this line would be needed.
            // options.dataType = "jsonp";
            return Collection.prototype.fetch.call(this, options);
        },

        parse: function (response) {
            return response.forecast.simpleforecast.forecastday;
        }

    });

    return Days;

});
