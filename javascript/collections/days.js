import Collection from './collection';
import Day from '../models/day';

class Days extends Collection {

    get model() {
        return Day;
    }

    buildUrl(zip) {
        // I would rather not get the full hourly forcast for all 10 days,
        // and instead as needed, but the rate limit and api design push me toward this path.
        // If no zip is provided, use the ip and return geolookup info as well.
        const end = `${zip ? '' : 'geolookup/'}forecast10day/q/${zip || 'autoip'}.json`;
        return `//api.wunderground.com/api/3f6df2a3f0916b99/${end}`;
    }

    fetch(options) {
        options.url = this.buildUrl(options.zip);
        // If not allowing cors, this line would be needed.
        // options.dataType = "jsonp";
        return Collection.prototype.fetch.call(this, options);
    }

    parse(response) {
        return response.forecast.simpleforecast.forecastday;
    }

}

export default Days;
