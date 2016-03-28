import HoursCollection from '../../../../../javascript/collections/hours.js';
import BaseCollection from '../../../../../javascript/collections/collection.js';
import HourModel from '../../../../../javascript/models/hour.js';
// import { describe, it } from 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';

const hourlyGeo = require('../../../fixtures/nonspecific_hourly10day.json');

describe('Hours collection', () => {
    it('should be defined', () => {
        expect(HoursCollection).not.to.be.undefined;
    });
    describe('after being initialized', () => {
        let hours;
        beforeEach(() => {
            hours = new HoursCollection();
        });
        describe('the model value', () => {
            it('should be an hour model', () => {
                expect(new hours.model()).to.be.instanceof(HourModel);
            });
        });
        describe('the buildUrl function', () => {
            it('should correctly handle no zip', () => {
                expect(hours.buildUrl()).to.equal('//api.wunderground.com/api/3f6df2a3f0916b99/hourly10day/q/autoip.json');
            });
            it('should correctly handle a zip', () => {
                expect(hours.buildUrl(44024)).to.equal('//api.wunderground.com/api/3f6df2a3f0916b99/hourly10day/q/44024.json');
            });
        });
        describe('the parse function', () => {
            it('should correctly return an array based on the response', () => {
                const parsed = hours.parse(hourlyGeo);
                expect(parsed.length).to.equal(240);
            });
        });
        describe('the fetch function', () => {
            beforeEach(() => {
                sinon.stub(BaseCollection.prototype, 'fetch');
            });
            afterEach(() => {
                BaseCollection.prototype.fetch.restore();
            });
            it('should attempt to hit the server via base collection', () => {
                hours.fetch({zip: 44024});
                expect(BaseCollection.prototype.fetch.called).to.be.true;
            });
            it('should place passed in url option in super the super call options', () => {
                sinon.stub(hours, 'buildUrl').returns('testing-url-44024');
                hours.fetch({zip: 44024});
                // using calledWith isn't working (maybe due to options being an object)
                // so instead will dig into what it was called with manually
                // expect(BaseCollection.prototype.fetch.calledWith({url: 'testing-url-44024'})).to.be.true;
                expect(BaseCollection.prototype.fetch.args[0][0].url === 'testing-url-44024').to.be.true;
                hours.buildUrl.restore();
            });
        });
        describe('the byDay function', () => {
            it('should correctly return an array models for the passed in day', () => {
                const model1 = new HourModel({day: 1});
                const model2 = new HourModel({day: 2});
                const model3 = new HourModel({day: 1});
                hours.add([model1, model2, model3]);
                expect(hours.byDay(1).length).to.equal(2);
                expect(hours.byDay(1).contains(model1)).to.be.true;
                expect(hours.byDay(1).contains(model3)).to.be.true;
                expect(hours.byDay(2).length).to.equal(1);
                expect(hours.byDay(2).contains(model2)).to.be.true;
            });
        });
    });
});
