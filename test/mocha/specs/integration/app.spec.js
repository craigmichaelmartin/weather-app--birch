import { createServer, createApp } from '../../helpers';
//import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

describe('App', function () {

    describe('after being initialized', function () {

        beforeEach(function () {
            this.clock = sinon.useFakeTimers(new Date(2015, 10, 25).getTime());
            this.server = createServer();
            this.app = createApp();
            this.app.fetchForecastData();
            this.server.respond();
        });

        afterEach(function () {
            this.clock.restore();
            this.server.restore();
        });

        it('should have made the correct requests', function () {
            expect(this.server.requests.length).to.equal(2);
            expect(this.server.requests[0].method).to.equal('GET');
            expect(this.server.requests[0].url).to.contain(
                'http://api.wunderground.com/api/3f6df2a3f0916b99/geolookup/forecast10day/q/autoip.json'
            );
            expect(this.server.requests[1].method).to.equal('GET');
            expect(this.server.requests[1].url).to.contain(
                'http://api.wunderground.com/api/3f6df2a3f0916b99/hourly10day/q/autoip.json'
            );
        });

        it('should have an is-something class describing the condition', function () {
            expect(this.app.$el.hasClass('is-clear')).to.be.true;
        });

        describe('the app state model', function () {

            it('should have a zip code', function () {
                expect(this.app.appState.get('zip')).to.equal(44147);
            });

        });

        describe('the hours collection', function () {

            it('should have 200 hour models', function () {
                expect(this.app.hours.length).to.equal(240);
            });

        });

        describe('the days collection', function () {

            it('should have 10 day models', function () {
                expect(this.app.days.length).to.equal(10);
            });

        });

    });
});
