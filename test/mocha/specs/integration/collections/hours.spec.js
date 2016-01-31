define(function (require) {
    'use strict';

    var HoursCollection = require('collections/hours');
    var HourModel = require('models/hour');

    describe('Hours collection', function () {

        it('should be defined', function () {
            expect(HoursCollection).not.to.be.undefined;
        });

        describe('after being initialized', function () {

            beforeEach(function () {
                this.hours = new HoursCollection();
            });

            describe('the model value', function () {

                it('should be an hour model', function () {
                    expect(new this.hours.model()).to.be.instanceof(HourModel);
                });

            });

            describe('the buildUrl function', function () {

                it('should correctly handle no zip', function () {
                    expect(this.hours.buildUrl()).to.equal('http://api.wunderground.com/api/3f6df2a3f0916b99/hourly10day/q/autoip.json');
                });

                it('should correctly handle a zip', function () {
                    expect(this.hours.buildUrl(44024)).to.equal('http://api.wunderground.com/api/3f6df2a3f0916b99/hourly10day/q/44024.json');
                });

            });

            describe('the parse function', function () {
                it('should correctly return an array based on the response', function () {
                    var parsed = this.hours.parse(Helpers.Fixtures.hourlyGeo);
                    expect(parsed.length).to.equal(240);
                });
            });

            describe('the fetch function', function () {
                beforeEach(function () {
                    this.BaseCollection = require('collections/collection');
                    sinon.stub(this.BaseCollection.prototype, 'fetch');
                });

                afterEach(function () {
                    this.BaseCollection.prototype.fetch.restore();
                });

                it('should attempt to hit the server via base collection', function () {
                    this.hours.fetch({zip: 44024});
                    expect(this.BaseCollection.prototype.fetch.called).to.be.true;
                });

                it('should place passed in url option in super the super call options', function () {
                    sinon.stub(this.hours, 'buildUrl').returns('testing-url-44024');
                    this.hours.fetch({zip: 44024});
                    // using calledWith isn't working (maybe due to options being an object)
                    // so instead will dig into what it was called with manually
                    // expect(this.BaseCollection.prototype.fetch.calledWith({url: 'testing-url-44024'})).to.be.true;
                    expect(this.BaseCollection.prototype.fetch.args[0][0].url === 'testing-url-44024').to.be.true;
                    this.hours.buildUrl.restore();
                });
            });

            describe('the byDay function', function () {
                it('should correctly return an array models for the passed in day', function () {
                    var model1 = new HourModel({day: 1});
                    var model2 = new HourModel({day: 2});
                    var model3 = new HourModel({day: 1});
                    this.hours.add([model1, model2, model3]);
                    expect(this.hours.byDay(1).length).to.equal(2);
                    expect(this.hours.byDay(1).contains(model1)).to.be.true;
                    expect(this.hours.byDay(1).contains(model3)).to.be.true;
                    expect(this.hours.byDay(2).length).to.equal(1);
                    expect(this.hours.byDay(2).contains(model2)).to.be.true;
                });
            });

        });
    });
});
