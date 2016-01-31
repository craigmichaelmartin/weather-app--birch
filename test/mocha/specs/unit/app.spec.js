define(function (require) {
    'use strict';

    var AppView = require('app');

    describe('App view', function () {

        it('should be defined', function () {
            expect(AppView).not.to.be.undefined;
        });

        describe('the getConditionClass function', function () {

            it('should return is-rainy when rainy', function () {
                expect(AppView.prototype.getConditionClass('chance of rain')).to.equal('is-rainy');
                expect(AppView.prototype.getConditionClass('scattered showers')).to.equal('is-rainy');
                expect(AppView.prototype.getConditionClass('chance of thunderstorms')).to.equal('is-rainy');
            });

            it('should return is-snowy when snowy', function () {
                expect(AppView.prototype.getConditionClass('chance of snow')).to.equal('is-snowy');
                expect(AppView.prototype.getConditionClass('3-4 inches of snow')).to.equal('is-snowy');
                expect(AppView.prototype.getConditionClass('heavy snowfall')).to.equal('is-snowy');
                expect(AppView.prototype.getConditionClass('snow showers')).to.equal('is-snowy');
            });

            it('should return is-clear when clear', function () {
                expect(AppView.prototype.getConditionClass('clear skies')).to.equal('is-clear');
                expect(AppView.prototype.getConditionClass('mostly sunny')).to.equal('is-clear');
                expect(AppView.prototype.getConditionClass('sunny')).to.equal('is-clear');
            });

            it('should return is-cloudy as graceful default', function () {
                expect(AppView.prototype.getConditionClass('mostly cloudy')).to.equal('is-cloudy');
                expect(AppView.prototype.getConditionClass('who knows')).to.equal('is-cloudy');
                expect(AppView.prototype.getConditionClass('made up weathery words not expected')).to.equal('is-cloudy');
            });
        });
    });
});

