import { getDateSentence }  from '../../../../../javascript/util/date.js';
//import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('Date util', function () {

    describe('get date sentence', function () {

        it('should return an english date and time sentence', function () {
            var sentence = getDateSentence('english', 'Monday', 'May', '13', '17');
            var expected = 'Monday, May 13 at 5:00pm';
            expect(sentence).to.eql(expected);
        });

        it('should return a metric style date and time sentence', function () {
            var sentence = getDateSentence('metric', 'Monday', 'May', '13', '17');
            var expected = 'Monday, 13 May at 17:00';
            expect(sentence).to.eql(expected);
        });

        it('should return an english date sentence', function () {
            var sentence = getDateSentence('english', 'Monday', 'May', '13');
            var expected = 'Monday, May 13';
            expect(sentence).to.eql(expected);
        });

        it('should return a metric style date sentence', function () {
            var sentence = getDateSentence('english', 'Monday', 'May', '13');
            var expected = 'Monday, May 13';
            expect(sentence).to.eql(expected);
        });

    });

});
