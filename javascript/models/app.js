import Model from './model';
import {getDeltaDate} from '../util/date';
import _ from 'underscore';

class AppState extends Model {

    defaults() {
        return {
            zip: void 0,
            day: new Date().getDate(),
            hour: void 0,
            scale: 'english'
        };
    }

    get scales() {
        return ['english', 'metric'];
    }

    get zipNotNumeric() {
        return 'Zip code must be numeric';
    }

    get zipNotLength() {
        return 'Zip code must be five digits';
    }

    get dayNotNear() {
        return 'Day must be within ten days of today';
    }

    get hourNeedsDay() {
        return 'Day must be selected to choose an hour';
    }

    get hourNotValid() {
        return 'Hour must be between 0 and 23';
    }

    get hourNotValidToday() {
        return 'Hour must be after current hour';
    }

    get scaleNotValid() {
        const scales = this.scales.join(', ');
        const lastComma = scales.lastIndexOf(',');
        const readable = `${scales.substring(0, lastComma)} or ${scales.substring(lastComma + 2)}`;
        return `Scale must be ${readable}`;
    }

    validate(attrs) {
        const errors = [];
        const now = new Date();
        if (!_.isNumber(attrs.zip) || _.isNaN(attrs.zip)) {
            errors.push(this.zipNotNumeric);
        } else if (attrs.zip < 0 || attrs.zip.toString().length !== 5) {
            errors.push(this.zipNotLength);
        }
        if (attrs.day) {
            const dates = [];
            for (let index = 0; index < 10; index++) {
                dates.push(getDeltaDate(now, index).getDate());
            }
            if (dates.indexOf(attrs.day) === -1) {
                errors.push(this.dayNotNear);
            }
        }
        if (attrs.hour) {
            if (!attrs.day) {
                errors.push(this.hourNeedsDay);
            }
            const validHours = _.range(24); // Array.apply(null, {length: 24}).map(Number.call, Number);
            if (validHours.indexOf(attrs.hour) === -1) {
                errors.push(this.hourNotValid);
            } else if (attrs.day === now.getDate()) {
                if (validHours.slice(now.getHours()).indexOf(attrs.hour) === -1) {
                    errors.push(this.hourNotValidToday);
                }
            }
        }
        if (attrs.scale) {
            if (this.scales.indexOf(attrs.scale) === -1) {
                errors.push(this.scaleNotValid);
            }
        }
        return errors.length ? errors : void 0;
    }

}

export default AppState;
