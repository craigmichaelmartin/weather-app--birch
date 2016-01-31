define([
    'views/view',
    'util/temperature',
    'util/time',
    'text!templates/chart.html',
    'handlebarsHelpers',
    'd3',
    'jquery'
], function (View, tempUtils, timeUtils, template, Handlebars, d3, $) {

    'use strict';

    var ChartView = View.extend({

        template: Handlebars.compile(template),

        events: {
            'click .js-hourBar': 'hourClicked',
            'click .js-hourText': 'hourTextClicked'
        },

        initialize: function (options) {
            options = options || {};
            this.appState = options.appState;
            this.hours = options.hours;
            this.listenTo(this.appState, 'dataReady', this.render);
            this.listenTo(this.appState, 'change:day', this.render);
            this.listenTo(this.appState, 'change:scale', this.render);
            this.render();
        },

        hourClicked: function (e) {
            var time = $(e.currentTarget).data('time');
            var el = e.currentTarget;
            return this.makeHourActive(time, el);
        },

        hourTextClicked: function (e) {
            var time = $(e.currentTarget).data('time');
            var el = $('[data-time=\'' + time + '\']')[0];
            return this.makeHourActive(time, el);
        },

        makeHourActive: function (time, el) {
            $('.hourBar.is-active').attr('class', 'js-hourBar hourBar');
            el.setAttribute('class', 'js-hourBar hourBar is-active');
            return this.appState.set('hour', time);
        },

        afterRender: function () {

            var getTime = function (d) {
                return d.time;
            };
            var getPresentationTime = function (d) {
                return timeUtils.getScaledTime(this.appState.get('scale'), d.time, {hideMinutes: true});
            };
            var getAbsTemp = function (d) {
                return Math.abs(d.temp);
            };
            var getPresentationTemp = function (d) {
                return tempUtils.getScaledTemperature(this.appState.get('scale'), d.temp) + '°';
            };

            var margin = {
                upper: 0,
                right: 0,
                bottom: 100,
                left: 0
            };
            var width = $('.js-d3Chart').width() - margin.left - margin.right;
            var height = $('.js-d3Chart').height() - margin.upper - margin.bottom;

            var x = d3.scale.ordinal()
                .rangeRoundBands([0, width], 0.1);

            var y = d3.scale.linear()
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient('bottom');

            var svg = d3.select('.js-d3Chart')
                .append('div')
                .classed('svg-container', true)
                .append('svg')
                .attr('preserveAspectRatio', 'xMinYMin meet')
                .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.upper + margin.bottom))
                .classed('svg-content-responsive', true)
              .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.upper + ')');

            var data = this.hours.byDay(this.appState.get('day')).map((function (model) {
                return {
                    temp: model.get('temperature'),
                    time: model.get('hour')
                };
            }).bind(this));

            x.domain(data.map(getTime));
            y.domain([0, d3.max(data, getAbsTemp)]);

            var self = this;
            xAxis.tickValues(
                data.map(function (d,i) {
                    if (i % 4 === 0) {
                        return d.time;
                    }
                }).filter(function (d) {
                    return d !== void 0;
                })
            );
            xAxis.tickFormat(function (d) {
                return timeUtils.getScaledTime(self.appState.get('scale'), d, {hideMinutes: true});
            });

            svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + height + ')')
                .call(xAxis);

            svg.selectAll()
                .data(data)
              .enter().append('rect')
                .attr('class', 'js-hourBar hourBar')
                .attr('x', function (d, i) {
                    return i * (width / data.length);
                })
                .attr('width', x.rangeBand())
                .attr('y', function (d) {
                    return y(d.temp);
                })
                .attr('height', function (d) {
                    return height - y(d.temp);
                })
                .attr('data-time', getTime);

            svg.selectAll()
                .data(data)
                .enter()
                .append('text')
                .attr('class', 'hourText js-hourTemperature js-hourText')
                .attr('x', function (d, i) {
                    return ((i * width / data.length) + (width / data.length / 2) - 3);
                })
                .attr('y', function (d, i) {
                    return y(d.temp) + 25;
                })
                .attr('data-time', getTime)
                .text(getPresentationTemp.bind(this));

            svg.selectAll()
                .data(data)
                .enter()
                .append('text')
                .attr('class', 'hourText js-hourTime js-hourText')
                .attr('font-family', 'sans-serif')
                .attr('font-size', '16px')
                .attr('x', function (d, i) {
                    return ((i * width / data.length) + (width / data.length / 2) - 3);
                })
                .attr('y', function (d, i) {
                    return y(d.temp) + 50;
                })
                .attr('data-time', getTime)
                .text(getPresentationTime.bind(this));

            var ratioPercentage = height / width * 110;
            $('.svg-container').css('padding-bottom', ratioPercentage + '%');
            if ($.isNumeric(this.appState.get('hour'))) {
                var time = this.appState.get('hour');
                $('.js-hourBar[data-time=\'' + time + '\']')[0].setAttribute('class', 'js-hourBar hourBar is-active');
            }
        }
    });

    return ChartView;

});
