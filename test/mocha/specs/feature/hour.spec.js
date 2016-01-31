define(function (require) {
    'use strict';

    describe('App after loading', function () {

        beforeEach(function () {
            this.clock = sinon.useFakeTimers(new Date(2015, 10, 25, 12).getTime());
            this.server = Helpers.createServer();
            this.app = Helpers.createApp();
            this.app.fetchForecastData();
            this.server.respond();
        });

        afterEach(function () {
            this.clock.restore();
            this.server.restore();
        });

        describe('interacting with an hour', function () {

            describe('bar', function () {

                beforeEach(function () {
                    this.$clickedHour = $('.js-hourBar').last().click();
                });

                it('should update the app state model', function () {
                    expect(this.app.appState.get('hour')).to.equal(23);
                });

                it('should add the active class to it', function () {
                    expect(this.$clickedHour[0].className.animVal.indexOf('is-active') >= 0).to.be.true;
                });

                it('should result in only one active class', function () {
                    expect($('.hourBar.is-active').length).to.equal(1);
                });

                it('should update the sidebar with the hours\'s statistics', function () {
                    var statsHourText = $('.js-statistics').children().first().text().trim();
                    var expected = 'Friday, September 25 at 11:00pm';
                    expect(expected).to.equal(statsHourText);
                });

            });

            describe('time text', function () {

                beforeEach(function () {
                    this.$clickedHourText = $('.js-hourTime').last().click();
                });

                it('should update the app state model', function () {
                    expect(this.app.appState.get('hour')).to.equal(23);
                });

                it('should add the active class to it\'s bar', function () {
                    var time = this.$clickedHourText.data('time');
                    var el = $('[data-time=\'' + time + '\']')[0];
                    expect(el.className.animVal.indexOf('is-active') >= 0).to.be.true;
                });

                it('should result in only one active class', function () {
                    expect($('.hourBar.is-active').length).to.equal(1);
                });

                it('should update the sidebar with the hours\'s statistics', function () {
                    var statsHourText = $('.js-statistics').children().first().text().trim();
                    var expected = 'Friday, September 25 at 11:00pm';
                    expect(expected).to.equal(statsHourText);
                });

            });

            describe('temperature text', function () {

                beforeEach(function () {
                    this.$clickedHourText = $('.js-hourTemperature').last().click();
                });

                it('should update the app state model', function () {
                    expect(this.app.appState.get('hour')).to.equal(23);
                });

                it('should add the active class to it\'s bar', function () {
                    var time = this.$clickedHourText.data('time');
                    var el = $('[data-time=\'' + time + '\']')[0];
                    expect(el.className.animVal.indexOf('is-active') >= 0).to.be.true;
                });

                it('should result in only one active class', function () {
                    expect($('.hourBar.is-active').length).to.equal(1);
                });

                it('should update the sidebar with the hours\'s statistics', function () {
                    var statsHourText = $('.js-statistics').children().first().text().trim();
                    var expected = 'Friday, September 25 at 11:00pm';
                    expect(expected).to.equal(statsHourText);
                });

            });

        });

    });

});
