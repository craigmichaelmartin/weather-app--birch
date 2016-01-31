define(function (require) {
    'use strict';

    var DaysCollection = require('collections/days');
    var DayModel = require('models/day');

    describe('Days collection', function () {

        it('should be defined', function () {
            expect(DaysCollection).not.to.be.undefined;
        });

        describe('after being initialized', function () {

            beforeEach(function () {
                this.days = new DaysCollection();
            });

            describe('the model value', function () {

                it('should be a day model', function () {
                    expect(new this.days.model()).to.be.instanceof(DayModel);
                });

            });

            describe('the buildUrl function', function () {

                it('should correctly handle no zip', function () {
                    expect(this.days.buildUrl()).to.equal('http://api.wunderground.com/api/3f6df2a3f0916b99/geolookup/forecast10day/q/autoip.json');
                });

                it('should correctly handle a zip', function () {
                    expect(this.days.buildUrl(44024)).to.equal('http://api.wunderground.com/api/3f6df2a3f0916b99/forecast10day/q/44024.json');
                });

            });

            describe('the parse function', function () {
                it('should correctly return an array based on the response', function () {
                    var parsed = this.days.parse(Helpers.Fixtures.dailyGeo);
                    expect(parsed.length).to.equal(10);
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
                    this.days.fetch({zip: 44024});
                    expect(this.BaseCollection.prototype.fetch.called).to.be.true;
                });

                it('should place passed in url option in super the super call options', function () {
                    sinon.stub(this.days, 'buildUrl').returns('testing-url-44024');
                    this.days.fetch({zip: 44024});
                    // using calledWith isn't working (maybe due to options being an object)
                    // so instead will dig into what it was called with manually
                    // expect(this.BaseCollection.prototype.fetch.calledWith({url: 'testing-url-44024'})).to.be.true;
                    expect(this.BaseCollection.prototype.fetch.args[0][0].url === 'testing-url-44024').to.be.true;
                    this.days.buildUrl.restore();
                });
            });

        });
    });
});
