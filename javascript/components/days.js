import View from '../views/view';
import DayView from './day';

class DaysView extends View {

    initialize(options) {
        this.days = options.days;
        this.appState = options.appState;
        this.views = [];
        this.listenTo(this.days, 'sync', this.render);
        this.listenTo(this.appState, 'change:scale', this.render);
        this.listenTo(this.appState, 'dataReady', this.render);
        this.render();
    }

    deleteViews() {
        while (this.views.length > 0) {
            this.views[0].deleteView();
            delete this.views[0];
            this.views.shift();
        }
    }

    render() {
        this.deleteViews();
        this.$el.empty();
        this.days.each(this.assignOne, this);
    }

    assignOne(day) {
        const view = new DayView({
            model: day,
            appState: this.appState
        });
        this.$el.append(view.render().el);
        this.views.push(view);
    }

}

export default DaysView;
