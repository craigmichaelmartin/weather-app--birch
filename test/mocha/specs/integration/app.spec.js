import {createServer, createApp} from '../../helpers';
// import { describe, it } from 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';

describe('App', () => {
    describe('after being initialized', () => {
        let clock, server, app;
        beforeEach(() => {
            clock = sinon.useFakeTimers(new Date(2015, 10, 25).getTime());
            server = createServer();
            app = createApp();
            app.fetchForecastData();
            server.respond();
        });
        afterEach(() => {
            clock.restore();
            server.restore();
        });
        it('should have made the correct requests', () => {
            expect(server.requests.length).to.equal(2);
            expect(server.requests[0].method).to.equal('GET');
            expect(server.requests[0].url).to.contain(
                '//api.wunderground.com/api/3f6df2a3f0916b99/geolookup/forecast10day/q/autoip.json'
            );
            expect(server.requests[1].method).to.equal('GET');
            expect(server.requests[1].url).to.contain(
                '//api.wunderground.com/api/3f6df2a3f0916b99/hourly10day/q/autoip.json'
            );
        });
        it('should have an is-something class describing the condition', () => {
            expect(app.$el.hasClass('is-clear')).to.be.true;
        });
        describe('the app state model', () => {
            it('should have a zip code', () => {
                expect(app.appState.get('zip')).to.equal(44147);
            });
        });
        describe('the hours collection', () => {
            it('should have 200 hour models', () => {
                expect(app.hours.length).to.equal(240);
            });
        });
        describe('the days collection', () => {
            it('should have 10 day models', () => {
                expect(app.days.length).to.equal(10);
            });
        });
    });
});
