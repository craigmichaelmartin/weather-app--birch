import Collection from './collection';
import Hour from '../models/hour';

class Hours extends Collection {

    get model() {
        return Hour;
    }

    buildUrl(zip) {
        // I would rather not get the full hourly forcast for all 10 days,
        // and instead as needed, but the rate limit and api design push me toward this path.
        const end = `${zip || 'autoip'}.json`;
        return `http://api.wunderground.com/api/3f6df2a3f0916b99/hourly10day/q/${end}`;
    }

    fetch(options) {
        options.url = this.buildUrl(options.zip);
        // If not allowing cors, this line would be needed.
        // options.dataType = "jsonp";
        return Collection.prototype.fetch.call(this, options);
    }

    parse(response) {
        return response.hourly_forecast; // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
    }

    byDay(day) {
        return new Hours(this.filter((model) => model.get('day') === day));
    }

    get comparator() {
        return 'hour';
    }

}

export default Hours;
