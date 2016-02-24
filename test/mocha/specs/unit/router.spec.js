import Router from '../../../../javascript/router.js';
//import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

describe('Router', function () {

    it('should be defined', function () {
        expect(Router).not.to.be.undefined;
    });

    describe('the getValues function', function () {

        describe('with zip, day, hour, and scale', function () {

            it('called normally', function () {
                expect(Router.prototype.getValues(44024, 24, 1, 'metric')).to.eql({
                    zip: 44024,
                    day: 24,
                    hour: 1,
                    scale: 'metric'
                });
            });

            it('called as strings', function () {
                expect(Router.prototype.getValues('44024', '24', '1', 'metric')).to.eql({
                    zip: 44024,
                    day: 24,
                    hour: 1,
                    scale: 'metric'
                });
            });

            it('called with english', function () {
                expect(Router.prototype.getValues('44024', '24', '1', 'english')).to.eql({
                    zip: 44024,
                    day: 24,
                    hour: 1,
                    scale: 'english'
                });
            });

            it('called with metric', function () {
                expect(Router.prototype.getValues('44024', '24', '1', 'metric')).to.eql({
                    zip: 44024,
                    day: 24,
                    hour: 1,
                    scale: 'metric'
                });
            });

        });

        describe('with zip, day, and scale', function () {

            it('called normally', function () {
                expect(Router.prototype.getValues(44024, 24, 'metric')).to.eql({
                    zip: 44024,
                    day: 24,
                    hour: void 0,
                    scale: 'metric'
                });
            });

            it('called as strings', function () {
                expect(Router.prototype.getValues('44024', '24', 'metric')).to.eql({
                    zip: 44024,
                    day: 24,
                    hour: void 0,
                    scale: 'metric'
                });
            });

            it('called with english', function () {
                expect(Router.prototype.getValues('44024', '24', 'english')).to.eql({
                    zip: 44024,
                    day: 24,
                    hour: void 0,
                    scale: 'english'
                });
            });

            it('called with metric', function () {
                expect(Router.prototype.getValues('44024', '24', 'metric')).to.eql({
                    zip: 44024,
                    day: 24,
                    hour: void 0,
                    scale: 'metric'
                });
            });

        });

        describe('with zip and scale', function () {

            beforeEach(function () {
                this.clock = sinon.useFakeTimers(new Date(2015, 10, 25).getTime());
            });

            afterEach(function () {
                this.clock.restore();
            });

            it('called normally', function () {
                expect(Router.prototype.getValues(44024, 'metric')).to.eql({
                    zip: 44024,
                    day: 25,
                    hour: void 0,
                    scale: 'metric'
                });
            });

            it('called as strings', function () {
                expect(Router.prototype.getValues('44024', 'metric')).to.eql({
                    zip: 44024,
                    day: 25,
                    hour: void 0,
                    scale: 'metric'
                });
            });

            it('called with english', function () {
                expect(Router.prototype.getValues('44024', 'english')).to.eql({
                    zip: 44024,
                    day: 25,
                    hour: void 0,
                    scale: 'english'
                });
            });

            it('called with metric', function () {
                expect(Router.prototype.getValues('44024', 'metric')).to.eql({
                    zip: 44024,
                    day: 25,
                    hour: void 0,
                    scale: 'metric'
                });
            });
        });
    });
});
