const chai = require('chai');
const catchem = require('../../catchem');
const expect = chai.expect;

describe('Catchem', function () {
    it('it should be a void function', function () {
        expect(catchem).to.be.an('object');
        expect(typeof catchem.init).to.equal('function');
    });
});