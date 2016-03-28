import Model from './model';
import _ from 'underscore';

class Day extends Model {

    get defaultKeys() {
        return [
            'condition', 'iconUrl', 'iconAlt', 'high', 'low', 'monthname',
            'weekday', 'weekdayShort', 'day', 'totalSnow', 'averageHumidity',
            'averageWindDirection', 'averageWind', 'precipitation'
        ];
    }

    defaults() {
        const defaults = {};
        this.defaultKeys.forEach((key) => {
            defaults[key] = void 0;
        });
        return defaults;
    }

    buildUrl(zip) {
        return `//api.wunderground.com/api/3f6df2a3f0916b99/hourly/q/${zip || 'autoip'}.json`;
    }

    parse(results) {
        return _.mapObject({
            condition: results.conditions,
            iconUrl: results.icon_url,
            iconAlt: results.icon,
            high: results.high.fahrenheit,
            low: results.low.fahrenheit,
            monthname: results.date.monthname,
            weekday: results.date.weekday,
            weekdayShort: results.date.weekday_short,
            day: +results.date.day,
            totalSnow: results.snow_allday.in,
            averageHumidity: results.avehumidity,
            averageWindDirection: results.avewind.dir,
            averageWind: results.avewind.mph,
            precipitation: results.qpf_allday.in
        }, (val) => {
            if (val === '-9999' || val === '-999') {
                return void 0;
            }
            return val;
        });
    }

}

export default Day;
