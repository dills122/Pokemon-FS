const chai = require('chai');
const battle = require('../../src/battle');
const expect = chai.expect;
const assert = require('assert');

describe('Battle', function () {
    it('it should return a boolean', function () {
        expect(battle).to.be.an('object');
        expect(battle.Battle).to.be.an('function');
    });
});

describe('SetupBattle',function() {
    it('it should return an object', function() {
        const pokemon = "charmander";
        expect(battle).to.be.an('object');
        expect(battle.SetupBattle).to.be.an('function');
        battle.SetupBattle(pokemon).then(pokeObj => {
            expect(pokeObj).to.be.an('object');
            assert.equal(pokeObj.battlePokemon.name, pokemon);       
        }).catch(error => {
            assert.ifError(error);
        });
    });
});

describe('PercentDifference', function() {
    it('Should return a whole number', function() {
        const valOne = 5;
        const valTwo = 10;
        const expectedPD = 67;
        expect(battle).to.be.an('object');
        expect(battle.PercentDifference).to.be.an('function');
        let PD = battle.PercentDifference(valOne, valTwo);
        assert.equal(PD, expectedPD);
        expect(PD).to.be.an('number');
        chai.assert.isAbove(PD, 0);        
    });
});

describe('LowerBond', function() {
    it('should return a number', function() {
        const PD = 67;
        const expectedValue = 51;
        expect(battle).to.be.an('object');
        expect(battle.LowerBond).to.be.an('function');
        let LB = battle.LowerBond(PD);
        assert.equal(LB, expectedValue);
        chai.assert.isAbove(PD,LB);
        chai.assert.isNumber(LB);
    });
});

describe('GetRandInt', function() {
    it('should return a number within a given range', function() {
        const LB = 10;
        const UB = 30;
        expect(battle).to.be.an('object');
        expect(battle.LowerBond).to.be.an('function');
        let RN = battle.GetRandInt(LB,UB);
        chai.assert.isAbove(RN,LB);
        chai.assert.isBelow(RN,UB);
        chai.assert.isNumber(RN);
    });
});