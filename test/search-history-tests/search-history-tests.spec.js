const assert = require('assert');
const chai = require('chai');
const sh = require('../../src/search-history');
const expect = chai.expect;

describe('ReviewSearchHistory', function() {
    it('should return a bool of CanSearch', function() {
        expect(sh).to.be.an('object');
        sh.ReviewSearchHistory().then((CanSearch) => {
            assert.equal(CanSearch, true);
        });
    });
});