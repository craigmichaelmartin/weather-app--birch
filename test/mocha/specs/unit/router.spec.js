import Router from '../../../../javascript/router.js';
// import { describe, it } from 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';

describe('Router', () => {
    it('should be defined', () => {
        expect(Router).not.to.be.undefined;
    });
    describe('the getValues function', () => {
        describe('with zip, day, hour, and scale', () => {
            it('called normally', () => {
                expect(Router.prototype.getValues(44024, 24, 1, 'metric')).to.eql({
                    zip: 44024,
                    day: 24,
                    hour: 1,
                    scale: 'metric'
                });
            });
            it('called as strings', () => {
                expect(Router.prototype.getValues('44024', '24', '1', 'metric')).to.eql({
                    zip: 44024,
                    day: 24,
                    hour: 1,
                    scale: 'metric'
                });
            });
            it('called with english', () => {
                expect(Router.prototype.getValues('44024', '24', '1', 'english')).to.eql({
                    zip: 44024,
                    day: 24,
                    hour: 1,
                    scale: 'english'
                });
            });
            it('called with metric', () => {
                expect(Router.prototype.getValues('44024', '24', '1', 'metric')).to.eql({
                    zip: 44024,
                    day: 24,
                    hour: 1,
                    scale: 'metric'
                });
            });
        });
        describe('with zip, day, and scale', () => {
            it('called normally', () => {
                expect(Router.prototype.getValues(44024, 24, 'metric')).to.eql({
                    zip: 44024,
                    day: 24,
                    hour: void 0,
                    scale: 'metric'
                });
            });
            it('called as strings', () => {
                expect(Router.prototype.getValues('44024', '24', 'metric')).to.eql({
                    zip: 44024,
                    day: 24,
                    hour: void 0,
                    scale: 'metric'
                });
            });
            it('called with english', () => {
                expect(Router.prototype.getValues('44024', '24', 'english')).to.eql({
                    zip: 44024,
                    day: 24,
                    hour: void 0,
                    scale: 'english'
                });
            });
            it('called with metric', () => {
                expect(Router.prototype.getValues('44024', '24', 'metric')).to.eql({
                    zip: 44024,
                    day: 24,
                    hour: void 0,
                    scale: 'metric'
                });
            });
        });
        describe('with zip and scale', () => {
            let clock;
            beforeEach(() => {
                clock = sinon.useFakeTimers(new Date(2015, 10, 25).getTime());
            });
            afterEach(() => {
                clock.restore();
            });
            it('called normally', () => {
                expect(Router.prototype.getValues(44024, 'metric')).to.eql({
                    zip: 44024,
                    day: 25,
                    hour: void 0,
                    scale: 'metric'
                });
            });
            it('called as strings', () => {
                expect(Router.prototype.getValues('44024', 'metric')).to.eql({
                    zip: 44024,
                    day: 25,
                    hour: void 0,
                    scale: 'metric'
                });
            });
            it('called with english', () => {
                expect(Router.prototype.getValues('44024', 'english')).to.eql({
                    zip: 44024,
                    day: 25,
                    hour: void 0,
                    scale: 'english'
                });
            });
            it('called with metric', () => {
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
