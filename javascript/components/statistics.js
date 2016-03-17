import View from '../views/view';
import {getScaledTemperatureDegreeUnit} from '../util/temperature';
import {getDateSentence} from '../util/date';
import {getScaledLength} from '../util/length';
import {getScaledSpeedUnit} from '../util/speed';
import _ from 'underscore';

const fs = require('fs');
const path = require('path');
const dayTemplate = fs.readFileSync(path.join(__dirname, '/../templates/day_statistics.html'), 'utf8');
const hourTemplate = fs.readFileSync(path.join(__dirname, '/../templates/hour_statistics.html'), 'utf8');

class StatisticsView extends View {

    initialize({appState, hours, days}) {
        this.appState = appState;
        this.hours = hours;
        this.days = days;
        this.listenTo(this.appState, 'dataReady', this.render);
        this.listenTo(this.appState, 'change:day', this.showDay);
        this.listenTo(this.appState, 'change:hour', this.showHour);
        this.listenTo(this.appState, 'change:scale', this.render);
        if (this.appState.get('hour')) {
            this.showHour(this.appState, this.appState.get('hour'));
        } else if (this.appState.get('day')) {
            this.showDay(this.appState, this.appState.get('day'));
        }
    }

    showDay(model, day) {
        this.model = this.days.findWhere({day: +day});
        this.template = _.template(dayTemplate);
        this.render();
    }

    showHour(model, hour) {
        this.model = this.hours.findWhere({day: +this.appState.get('day'), hour: +hour});
        this.template = _.template(hourTemplate);
        this.render();
    }

    getTemplateData() {
        const {weekday, monthname, day, hour, low, high, temperature,
               feelsLike, dewPoint, heatIndex, totalSnow, averageWind,
               windSpeed, windDirection, averageWindDirection,
               precipitation} = this.model.attributes;
        const {scale} = this.appState.attributes;
        return _.extend({}, this.model.attributes, this.appState.attributes, {
            headerText: getDateSentence(scale, weekday, monthname, day, hour),
            highTemp: getScaledTemperatureDegreeUnit(scale, high),
            lowTemp: getScaledTemperatureDegreeUnit(scale, low),
            temp: getScaledTemperatureDegreeUnit(scale, temperature),
            feelsLike: getScaledTemperatureDegreeUnit(scale, feelsLike),
            dewPoint: getScaledTemperatureDegreeUnit(scale, dewPoint),
            heatIndex: getScaledTemperatureDegreeUnit(scale, heatIndex),
            snow: getScaledLength(scale, totalSnow),
            windSpeed: getScaledSpeedUnit(scale, averageWind || windSpeed),
            windDirection: averageWindDirection || windDirection,
            precipitation: getScaledLength(scale, precipitation)
        });
    }

}

export default StatisticsView;
