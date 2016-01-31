define(function (require) {
    'use strict';

    var HoursCollection = require('collections/hours');
    var HourModel = require('models/hour');

    describe('Hours collection', function () {

        it('should be defined', function () {
            expect(HoursCollection).not.to.be.undefined;
        });

        describe('after being initialized', function () {

            describe('the model value', function () {

                it('should be an hour model', function () {
                    expect(new HoursCollection.prototype.model()).to.be.instanceof(HourModel);
                });

            });

            describe('the buildUrl function', function () {

                it('should correctly handle no zip', function () {
                    expect(HoursCollection.prototype.buildUrl()).to.equal('http://api.wunderground.com/api/3f6df2a3f0916b99/hourly10day/q/autoip.json');
                });

                it('should correctly handle a zip', function () {
                    expect(HoursCollection.prototype.buildUrl(44024)).to.equal('http://api.wunderground.com/api/3f6df2a3f0916b99/hourly10day/q/44024.json');
                });

            });

            describe('the parse function', function () {
                it('should correctly return an array based on the response', function () {
                    var parsed = HoursCollection.prototype.parse(Helpers.Fixtures.hourlyGeo);
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
                    HoursCollection.prototype.fetch({zip: 44024});
                    expect(this.BaseCollection.prototype.fetch.called).to.be.true;
                });

                it('should place passed in url option in super the super call options', function () {
                    sinon.stub(HoursCollection.prototype, 'buildUrl').returns('testing-url-44024');
                    HoursCollection.prototype.fetch({zip: 44024});
                    // using calledWith isn't working (maybe due to options being an object)
                    // so instead will dig into what it was called with manually
                    // expect(this.BaseCollection.prototype.fetch.calledWith({url: 'testing-url-44024'})).to.be.true;
                    expect(this.BaseCollection.prototype.fetch.args[0][0].url === 'testing-url-44024').to.be.true;
                    HoursCollection.prototype.buildUrl.restore();
                });
            });
        });
    });
});
