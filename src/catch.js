const inquirer = require('inquirer');
const {
    GenerateQuestionObj
} = require('./q-builder');
const {
    CatchPokemon,
    GetRandomPokemon
} = require('./item-generation');
const {
    Battle
} = require('./battle');
const {
    GetPokemon,
} = require('./file-io');

function AttemptToCatch() {
    let luck = CheckLuck();
    if (!luck) {
        console.log("Couldn't find anything yet");
        return;
    }
    DisplayPrompt();
}

function DisplayPrompt() {
    inquirer.prompt([GenerateQuestionObj()]).then((answers) => {
        if (!answers.catch.includes('N')) {
            console.log('Nice! you found something!');
            var foundPokemon = "";
            GetPokemon().then(pokemonArry => {
                foundPokemon = GetRandomPokemon(JSON.parse(pokemonArry));
                return Battle(foundPokemon);
            }).then(IsWon => {
                if (IsWon) {
                    CatchPokemon(foundPokemon);
                } else {
                    console.log(`Your fight with ${foundPokemon} was unsuccessful`);
                }
            }).catch(error => {

            });
        }
    });
}

function CheckLuck() {
    const _maxNum = 50000;
    var randNum = Math.floor(Math.random() * _maxNum) + 1;
    if (randNum % 5 === 0 || randNum % 11 === 0) {
        return true;
    }
    return false;
}

module.exports = {
    AttemptToCatch
}