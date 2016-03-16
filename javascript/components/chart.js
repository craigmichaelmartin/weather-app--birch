import View from '../views/view';
import {getScaledTemperature} from '../util/temperature';
import {getScaledTime} from '../util/time';
import _ from 'underscore';
import $ from 'jquery';
import d3 from 'd3';

const fs = require('fs');
const path = require('path');
const template = fs.readFileSync(path.join(__dirname, '/../templates/chart.html'), 'utf8');

class ChartView extends View {

    get template() {
        return _.template(template);
    }

    get events() {
        return {
            'click .js-hourBar': 'hourClicked',
            'click .js-hourText': 'hourTextClicked'
        };
    }

    initialize(options = {}) {
        this.appState = options.appState;
        this.hours = options.hours;
        this.listenTo(this.appState, 'dataReady', this.render);
        this.listenTo(this.appState, 'change:day', this.render);
        this.listenTo(this.appState, 'change:scale', this.render);
        this.render();
    }

    hourClicked(e) {
        const time = $(e.currentTarget).data('time');
        const el = e.currentTarget;
        return this.makeHourActive(time, el);
    }

    hourTextClicked(e) {
        const time = $(e.currentTarget).data('time');
        const el = $(`[data-time="${time}"]`)[0];
        return this.makeHourActive(time, el);
    }

    makeHourActive(time, el) {
        $('.hourBar.is-active').attr('class', 'js-hourBar hourBar');
        el.setAttribute('class', 'js-hourBar hourBar is-active');
        return this.appState.set('hour', time);
    }

    afterRender() {
        const getTime = (d) => d.time;
        const getPresentationTime = (d) => getScaledTime(this.appState.get('scale'), d.time, {hideMinutes: true});
        const getAbsTemp = (d) => Math.abs(d.temp);
        const getPresentationTemp = (d) => `${getScaledTemperature(this.appState.get('scale'), d.temp)}°`;

        const margin = {
            upper: 0,
            right: 0,
            bottom: 100,
            left: 0
        };
        const width = $('.js-d3Chart').width() - margin.left - margin.right;
        const height = $('.js-d3Chart').height() - margin.upper - margin.bottom;

        const x = d3.scale.ordinal()
            .rangeRoundBands([0, width], 0.1);

        const y = d3.scale.linear()
            .range([height, 0]);

        const xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom');

        const svg = d3.select('.js-d3Chart')
            .append('div')
            .classed('svg-container', true)
            .append('svg')
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.upper + margin.bottom}`)
            .classed('svg-content-responsive', true)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.upper})`);

        const data = this.hours.byDay(this.appState.get('day')).map((model) => ({
            temp: model.get('temperature'),
            time: model.get('hour')
        }));

        x.domain(data.map(getTime));
        y.domain([0, d3.max(data, getAbsTemp)]);

        const that = this;
        xAxis.tickValues(
            data.map((d, i) => {
                if (i % 4 === 0) {
                    return d.time;
                }
                return void 0;
            }).filter((d) => d !== void 0)
        );
        xAxis.tickFormat((d) => getScaledTime(that.appState.get('scale'), d, {hideMinutes: true}));

        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0,${height})`)
            .call(xAxis);

        svg.selectAll()
            .data(data)
            .enter().append('rect')
            .attr('class', 'js-hourBar hourBar')
            .attr('x', (d, i) => i * (width / data.length))
            .attr('width', x.rangeBand())
            .attr('y', (d) => y(d.temp))
            .attr('height', (d) => height - y(d.temp))
            .attr('data-time', getTime);

        svg.selectAll()
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'hourText js-hourTemperature js-hourText')
            .attr('x', (d, i) => (i * width / data.length) + (width / data.length / 2) - 3)
            .attr('y', (d) => y(d.temp) + 25)
            .attr('data-time', getTime)
            .text(getPresentationTemp.bind(this));

        svg.selectAll()
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'hourText js-hourTime js-hourText')
            .attr('font-family', 'sans-serif')
            .attr('font-size', '16px')
            .attr('x', (d, i) => (i * width / data.length) + (width / data.length / 2) - 3)
            .attr('y', (d) => y(d.temp) + 50)
            .attr('data-time', getTime)
            .text(getPresentationTime.bind(this));

        const ratioPercentage = height / width * 110;
        $('.svg-container').css('padding-bottom', `${ratioPercentage}%`);
        if ($.isNumeric(this.appState.get('hour'))) {
            const time = this.appState.get('hour');
            $(`.js-hourBar[data-time="${time}"]`)[0].setAttribute('class', 'js-hourBar hourBar is-active');
        }
    }
}

export default ChartView;
