import {createServer, createApp} from '../../helpers';
// import { describe, it } from 'mocha';
import {expect} from 'chai';
import $ from 'jquery';
import sinon from 'sinon';

let clock, server, app;

describe('App after loading', () => {
    beforeEach(() => {
        clock = sinon.useFakeTimers(new Date(2015, 10, 25, 12).getTime());
        server = createServer();
        app = createApp();
        app.fetchForecastData();
        server.respond();
    });
    afterEach(() => {
        clock.restore();
        server.restore();
    });
    describe('before interacting', () => {
        describe('the zip code', () => {
            it('display should be visible', () => {
                expect($('.js-zip-display').css('display')).to.equal('inline');
            });
            it('input should be hidden', () => {
                expect($('.js-edit').css('display')).to.equal('none');
            });
            it('spinner should be hidden', () => {
                expect($('.js-spinner').css('display')).to.equal('none');
            });
        });
    });
    describe('invalid state', () => {
        describe('for zip', () => {
            afterEach(() => {
                $('.js-alertClose').click();
            });
            it('should indicate not valid zip', () => {
                expect(app.appState.set({zip: ''}, {validate: true})).to.be.false;
                expect($('.js-alertText').text().indexOf(app.appState.zipNotNumeric)).to.be.above(-1);
            });
            it('should indicate non-numeric zip', () => {
                expect(app.appState.set({zip: '1234S'}, {validate: true})).to.be.false;
                expect($('.js-alertText').text().indexOf(app.appState.zipNotNumeric)).to.be.above(-1);
            });
            it('should indicate too long zip', () => {
                expect(app.appState.set({zip: 123456}, {validate: true})).to.be.false;
                expect($('.js-alertText').text().indexOf(app.appState.zipNotLength)).to.be.above(-1);
            });
            it('should indicate too short zip', () => {
                expect(app.appState.set({zip: 1234}, {validate: true})).to.be.false;
                expect($('.js-alertText').text().indexOf(app.appState.zipNotLength)).to.be.above(-1);
            });
            it('should indicate negative zip', () => {
                expect(app.appState.set({zip: -1000}, {validate: true})).to.be.false;
                expect($('.js-alertText').text().indexOf(app.appState.zipNotLength)).to.be.above(-1);
            });
        });
        describe('for day', () => {
            it('should indicate day is too far out', () => {
                expect(app.appState.set({zip: 44147, day: 100}, {validate: true})).to.be.false;
                expect($('.js-alertText').text().indexOf(app.appState.dayNotNear)).to.be.above(-1);
            });
            it('should indicate day is too far out', () => {
                expect(app.appState.set({zip: 44147, day: 15}, {validate: true})).to.be.false;
                expect($('.js-alertText').text().indexOf(app.appState.dayNotNear)).to.be.above(-1);
            });
        });
        describe('for hour', () => {
            it('should indicate cannot have hour without day', () => {
                expect(app.appState.set({zip: 44147, day: void 0, hour: 13}, {validate: true})).to.be.false;
                expect($('.js-alertText').text().indexOf(app.appState.hourNeedsDay)).to.be.above(-1);
            });
            it('should indicate hour is not valid', () => {
                expect(app.appState.set({zip: 44147, day: 25, hour: 100}, {validate: true})).to.be.false;
                expect($('.js-alertText').text().indexOf(app.appState.hourNotValid)).to.be.above(-1);
            });
            it('should indicate hour is not valid for today', () => {
                expect(app.appState.set({zip: 44147, day: 25, hour: 10}, {validate: true})).to.be.false;
                expect($('.js-alertText').text().indexOf(app.appState.hourNotValidToday)).to.be.above(-1);
            });
        });
        describe('for scale', () => {
            it('should return an error message for invalid scale', () => {
                expect(app.appState.set({zip: 44147, scale: 'kelvin'}, {validate: true})).to.be.false;
                expect($('.js-alertText').text().indexOf(app.appState.scaleNotValid)).to.be.above(-1);
            });
        });
    });
});
