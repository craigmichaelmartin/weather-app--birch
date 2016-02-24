import DaysCollection from '../../../../../javascript/collections/days.js';
import BaseCollection from '../../../../../javascript/collections/collection.js';
//import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

const dailyGeo = require('../../../fixtures/nonspecific_forecast10day.json');

describe('Days collection', function () {

    it('should be defined', function () {
        expect(DaysCollection).not.to.be.undefined;
    });

    describe('after being initialized', function () {

        describe('the buildUrl function', function () {

            it('should correctly handle no zip', function () {
                expect(DaysCollection.prototype.buildUrl()).to.equal('http://api.wunderground.com/api/3f6df2a3f0916b99/geolookup/forecast10day/q/autoip.json');
            });

            it('should correctly handle a zip', function () {
                expect(DaysCollection.prototype.buildUrl(44024)).to.equal('http://api.wunderground.com/api/3f6df2a3f0916b99/forecast10day/q/44024.json');
            });

        });

        describe('the parse function', function () {
            it('should correctly return an array based on the response', function () {
                var parsed = DaysCollection.prototype.parse(dailyGeo);
                expect(parsed.length).to.equal(10);
            });
        });

        describe('the fetch function', function () {
            beforeEach(function () {
                sinon.stub(BaseCollection.prototype, 'fetch');
            });

            afterEach(function () {
                BaseCollection.prototype.fetch.restore();
            });

            it('should attempt to hit the server via base collection', function () {
                DaysCollection.prototype.fetch({zip: 44024});
                expect(BaseCollection.prototype.fetch.called).to.be.true;
            });

            it('should place passed in url option in super the super call options', function () {
                sinon.stub(DaysCollection.prototype, 'buildUrl').returns('testing-url-44024');
                DaysCollection.prototype.fetch({zip: 44024});
                // using calledWith isn't working (maybe due to options being an object)
                // so instead will dig into what it was called with manually
                // expect(BaseCollection.prototype.fetch.calledWith({url: 'testing-url-44024'})).to.be.true;
                expect(BaseCollection.prototype.fetch.args[0][0].url === 'testing-url-44024').to.be.true;
                DaysCollection.prototype.buildUrl.restore();
            });
        });

    });
});
