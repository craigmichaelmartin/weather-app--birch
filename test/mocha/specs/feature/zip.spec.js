import {createServer, createApp} from '../../helpers';
// import { describe, it } from 'mocha';
import {expect} from 'chai';
import $ from 'jquery';
import _ from 'underscore';
import sinon from 'sinon';

describe('App after loading', () => {
    let clock, server, app;
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
    describe('interacting with the zip', () => {
        let $zipDisplay;
        beforeEach(() => {
            $zipDisplay = $('.js-zip-display').click();
        });
        it('should hide the display', () => {
            expect($zipDisplay.css('display')).to.equal('none');
        });
        it('should show the input', () => {
            expect($('.js-edit').css('display')).to.equal('inline-block');
        });
        describe('validation', () => {
            describe('with errors', () => {
                it('should indicate invalid for no value', () => {
                    $('.js-edit').val('').trigger('keyup');
                    expect($('.js-edit').hasClass('is-invalid')).to.be.true;
                });
                it('should indicate invalid for non-numeric', () => {
                    $('.js-edit').val('12A65').trigger('keyup');
                    expect($('.js-edit').hasClass('is-invalid')).to.be.true;
                });
                it('should indicate invalid for invalidly long length', () => {
                    $('.js-edit').val('123456').trigger('keyup');
                    expect($('.js-edit').hasClass('is-invalid')).to.be.true;
                });
                it('should indicate invalid for invalidly short length', () => {
                    $('.js-edit').val('1234').trigger('keyup');
                    expect($('.js-edit').hasClass('is-invalid')).to.be.true;
                });
                it('should indicate invalid for negative', () => {
                    $('.js-edit').val('-1234').trigger('keyup');
                    expect($('.js-edit').hasClass('is-invalid')).to.be.true;
                });
            });
            describe('without errors', () => {
                beforeEach(() => {
                    $('.js-edit').val('44023').trigger('keyup');
                });
                it('should not indicate invalid input', () => {
                    expect($('.js-edit').hasClass('is-invalid')).to.be.false;
                });
                describe('when submitted', () => {
                    let hourRequests, dayRequests, serverRequests;
                    before(() => {
                        // record the number of requests with zip 44023
                        hourRequests = _.where(server.requests, {
                            url: '//api.wunderground.com/api/3f6df2a3f0916b99/hourly10day/q/44023.json'
                        });
                        dayRequests = _.where(server.requests, {
                            url: '//api.wunderground.com/api/3f6df2a3f0916b99/forecast10day/q/44023.json'
                        });

                        // less precise
                        serverRequests = server.requests.length;
                    });
                    beforeEach(() => {
                        $('.js-edit').blur();
                        $('.js-edit').focusout();
                    });
                    it('should show and hide the spinner appropriately', () => {
                        setTimeout(() => {
                            expect($('.js-spinner').css('display')).to.equal('inline-block');
                        }, 0);
                        server.respond();
                        expect($('.js-spinner').css('display')).to.equal('none');
                    });
                    it('should hide the input', () => {
                        server.respond();
                        expect($('.js-edit').css('display')).to.equal('none');
                    });
                    it('should show the display', () => {
                        server.respond();
                        expect($('.js-zip-display').css('display')).to.equal('inline');
                    });
                    it('should set the appState', () => {
                        server.respond();
                        expect(app.appState.get('zip')).to.equal(44023);
                    });
                    it('should fetch the new forecast', () => {
                        server.respond();
                        const hourUrl = '//api.wunderground.com/api/3f6df2a3f0916b99/hourly10day/q/44023.json';
                        const dayUrl = '//api.wunderground.com/api/3f6df2a3f0916b99/forecast10day/q/44023.json';
                        const hourReqs = server.requests.filter((request) => request.url.includes(hourUrl));
                        const dayReqs = server.requests.filter((request) => request.url.includes(dayUrl));
                        // using the before count, we can ensure there was a new fetch
                        // once the zip was changed
                        expect(hourReqs.length).to.equal(hourRequests.length + 1);
                        expect(dayReqs.length).to.equal(dayRequests.length + 1);
                        expect(server.requests.length).to.be.above(serverRequests);
                    });
                });
            });
        });
    });
});
