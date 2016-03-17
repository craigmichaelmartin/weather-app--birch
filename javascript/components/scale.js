import View from '../views/view';
import _ from 'underscore';

const fs = require('fs');
const path = require('path');
const template = fs.readFileSync(path.join(__dirname, '/../templates/scale.html'), 'utf8');

class ScaleView extends View {

    get template() {
        return _.template(template);
    }

    get events() {
        return {
            'click .js-english': 'englishScale',
            'click .js-metric': 'metricScale'
        };
    }

    initialize({appState}) {
        this.model = appState;
        this.render();
    }

    englishScale() {
        if (this.model.get('scale') === 'metric') {
            this.model.set('scale', 'english');
        }
    }

    metricScale() {
        if (this.model.get('scale') === 'english') {
            this.model.set('scale', 'metric');
        }
    }

}

export default ScaleView;
