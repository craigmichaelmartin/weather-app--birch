import View from '../views/view';
import _ from 'underscore';

const fs = require('fs');
const path = require('path');
const template = fs.readFileSync(path.join(__dirname, '/../templates/alert.html'), 'utf8');

class AlertView extends View {

    get template() {
        return _.template(template);
    }

    getMessage(errors) {
        return `The data provided was invalid. ${errors.join('. ')} .`;
    }

    initialize({errors}) {
        this.errors = errors;
    }

    getTemplateData() {
        return {
            message: this.getMessage(this.errors)
        };
    }

}

export default AlertView;
