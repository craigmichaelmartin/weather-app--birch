import View from '../views/view';
import _ from 'underscore';

const fs = require('fs');
const template = fs.readFileSync(__dirname + '/../templates/alert.html', 'utf8');

class AlertView extends View {

    get template() {
        return _.template(template);
    }

    getMessage(errors) {
        return 'The data provided was invalid. ' + errors.join('. ') + '.';
    }

    initialize(options) {
        options = options || {};
        this.errors = options.errors;
        this.render();
    }

    getTemplateData() {
        return {
            message: this.getMessage(this.errors)
        };
    }

}

export default AlertView;
