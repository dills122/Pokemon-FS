const chai = require('chai');
const battle = require('../../src/battle');
const expect = chai.expect;

describe('Battle', function () {
    it('it should return a boolean', function () {
        expect(battle).to.be.an('object');
        expect(battle.Battle).to.be.an('function');
    });
});