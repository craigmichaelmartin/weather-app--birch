import Router from '../../../../javascript/router';
import {createServer, createApp} from '../../helpers';
// import { describe, it } from 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';

describe('Router', () => {
    describe('after being initialized', () => {
        let clock, server, app, router;
        beforeEach(() => {
            clock = sinon.useFakeTimers(new Date(2015, 10, 25).getTime());
            server = createServer();
            app = createApp();
            sinon.stub(Router.prototype, 'navigate');
            sinon.spy(Router.prototype, 'getTitle');
            router = new Router({appState: app.appState});
            app.fetchForecastData();
            server.respond();
        });
        afterEach(() => {
            clock.restore();
            server.restore();
            Router.prototype.navigate.restore();
            Router.prototype.getTitle.restore();
        });
        describe('updatePeripheralsWithSate should respond to app state validly changing', () => {
            describe('the zip', () => {
                beforeEach(() => {
                    app.appState.set({zip: 77042});
                });
                it('should attempt to update the url', () => {
                    expect(router.navigate.calledWith('77042/25/english')).to.true;
                });
                it('should attempt to update the title', () => {
                    const title = 'Weather for 77042 on 11/25';
                    expect(router.getTitle.returned(title)).to.true;
                });
            });
            describe('the day', () => {
                beforeEach(() => {
                    app.appState.set({day: 26});
                });
                it('should attempt to update the url', () => {
                    expect(router.navigate.calledWith('44147/26/english')).to.true;
                });
                it('should attempt to update the title', () => {
                    const title = 'Weather for 44147 on 11/26';
                    expect(router.getTitle.returned(title)).to.true;
                });
            });
            describe('the hour', () => {
                beforeEach(() => {
                    app.appState.set({hour: 23});
                });
                it('should attempt to update the url', () => {
                    expect(router.navigate.calledWith('44147/25/23/english')).to.true;
                });
                it('should attempt to update the title', () => {
                    const title = 'Weather for 44147 on 11/25 at 11:00pm';
                    expect(router.getTitle.returned(title)).to.true;
                });
            });
            describe('the scale', () => {
                beforeEach(() => {
                    app.appState.set({scale: 'metric', hour: 23});
                });
                it('should attempt to update the url', () => {
                    expect(router.navigate.calledWith('44147/25/23/metric')).to.true;
                });
                it('should attempt to update the title', () => {
                    const title = 'Weather for 44147 on 25/11 at 23:00';
                    expect(router.getTitle.returned(title)).to.true;
                });
            });
        });
        describe('the getTitle function', () => {
            it('should handle no hour and english', () => {
                const title = 'Weather for 44147 on 11/25';
                expect(router.getTitle()).to.equal(title);
            });
            it('should handle no hour and metric', () => {
                app.appState.set({scale: 'metric'});
                const title = 'Weather for 44147 on 25/11';
                expect(router.getTitle()).to.equal(title);
            });
            it('should handle with hour english', () => {
                app.appState.set({hour: 23});
                const title = 'Weather for 44147 on 11/25 at 11:00pm';
                expect(router.getTitle()).to.equal(title);
            });
            it('should handle with hour metric', () => {
                app.appState.set({scale: 'metric', hour: 23});
                const title = 'Weather for 44147 on 25/11 at 23:00';
                expect(router.getTitle()).to.equal(title);
            });
            it('should handle past end of month english', () => {
                app.appState.set({day: 2}, {silent: true});
                const title = 'Weather for 44147 on 12/2';
                expect(router.getTitle()).to.equal(title);
            });
            it('should handle past end of month metric', () => {
                app.appState.set({scale: 'metric', day: 2}, {silent: true});
                const title = 'Weather for 44147 on 2/12';
                expect(router.getTitle()).to.equal(title);
            });
            it('should handle past end of month with hour english', () => {
                app.appState.set({day: 2, hour: 23}, {silent: true});
                const title = 'Weather for 44147 on 12/2 at 11:00pm';
                expect(router.getTitle()).to.equal(title);
            });
            it('should handle past end of month with hour metric', () => {
                app.appState.set({scale: 'metric', day: 2, hour: 23}, {silent: true});
                const title = 'Weather for 44147 on 2/12 at 23:00';
                expect(router.getTitle()).to.equal(title);
            });
        });
    });
});
