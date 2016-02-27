import Router from '../../../../javascript/router';
import { createServer, createApp } from '../../helpers';
//import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

describe('Router', function () {

    describe('after being initialized', function () {

        beforeEach(function () {
            this.clock = sinon.useFakeTimers(new Date(2015, 10, 25).getTime());
            this.server = createServer();
            this.app = createApp();
            sinon.stub(Router.prototype, 'navigate');
            sinon.spy(Router.prototype, 'getTitle');
            this.router = new Router({appState: this.app.appState});
            this.app.fetchForecastData();
            this.server.respond();
        });

        afterEach(function () {
            this.clock.restore();
            this.server.restore();
            Router.prototype.navigate.restore();
            Router.prototype.getTitle.restore();
        });

        describe('updatePeripheralsWithSate should respond to app state validly changing', function () {

            describe('the zip', function () {

                beforeEach(function () {
                    this.app.appState.set({zip: 77042});
                });

                it('should attempt to update the url', function () {
                    expect(this.router.navigate.calledWith('77042/25/english')).to.true;
                });

                it('should attempt to update the title', function () {
                    var title = 'Weather for 77042 on 11/25';
                    expect(this.router.getTitle.returned(title)).to.true;
                });

            });

            describe('the day', function () {

                beforeEach(function () {
                    this.app.appState.set({day: 26});
                });

                it('should attempt to update the url', function () {
                    expect(this.router.navigate.calledWith('44147/26/english')).to.true;
                });

                it('should attempt to update the title', function () {
                    var title = 'Weather for 44147 on 11/26';
                    expect(this.router.getTitle.returned(title)).to.true;
                });

            });

            describe('the hour', function () {

                beforeEach(function () {
                    this.app.appState.set({hour: 23});
                });

                it('should attempt to update the url', function () {
                    expect(this.router.navigate.calledWith('44147/25/23/english')).to.true;
                });

                it('should attempt to update the title', function () {
                    var title = 'Weather for 44147 on 11/25 at 11:00pm';
                    expect(this.router.getTitle.returned(title)).to.true;
                });

            });

            describe('the scale', function () {

                beforeEach(function () {
                    this.app.appState.set({scale: 'metric', hour: 23});
                });

                it('should attempt to update the url', function () {
                    expect(this.router.navigate.calledWith('44147/25/23/metric')).to.true;
                });

                it('should attempt to update the title', function () {
                    var title = 'Weather for 44147 on 25/11 at 23:00';
                    expect(this.router.getTitle.returned(title)).to.true;
                });

            });

        });

        describe('the getTitle function', function () {

            it('should handle no hour and english', function () {
                var title = 'Weather for 44147 on 11/25';
                expect(this.router.getTitle()).to.equal(title);
            });

            it('should handle no hour and metric', function () {
                this.app.appState.set({scale: 'metric'});
                var title = 'Weather for 44147 on 25/11';
                expect(this.router.getTitle()).to.equal(title);
            });

            it('should handle with hour english', function () {
                this.app.appState.set({hour: 23});
                var title = 'Weather for 44147 on 11/25 at 11:00pm';
                expect(this.router.getTitle()).to.equal(title);
            });

            it('should handle with hour metric', function () {
                this.app.appState.set({scale: 'metric', hour: 23});
                var title = 'Weather for 44147 on 25/11 at 23:00';
                expect(this.router.getTitle()).to.equal(title);
            });

            it('should handle past end of month english', function () {
                this.app.appState.set({day: 2}, {silent: true});
                var title = 'Weather for 44147 on 12/2';
                expect(this.router.getTitle()).to.equal(title);
            });

            it('should handle past end of month metric', function () {
                this.app.appState.set({scale: 'metric', day: 2}, {silent: true});
                var title = 'Weather for 44147 on 2/12';
                expect(this.router.getTitle()).to.equal(title);
            });

            it('should handle past end of month with hour english', function () {
                this.app.appState.set({day: 2, hour: 23}, {silent: true});
                var title = 'Weather for 44147 on 12/2 at 11:00pm';
                expect(this.router.getTitle()).to.equal(title);
            });

            it('should handle past end of month with hour metric', function () {
                this.app.appState.set({scale: 'metric', day: 2, hour: 23}, {silent: true});
                var title = 'Weather for 44147 on 2/12 at 23:00';
                expect(this.router.getTitle()).to.equal(title);
            });

        });

    });

});
