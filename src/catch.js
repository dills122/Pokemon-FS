const inquirer = require('inquirer');
const {
    GenerateQuestionObj
} = require('./q-builder');
const {
    CatchPokemon
} = require('./item-generation');

function AttemptToCatch(i) {
    i = i ? i : 0;
    inquirer.prompt([GenerateQuestionObj()]).then((answers) => {
        if (!answers.catch.includes('N')) {
            if (!CheckLuck()) {
                if (i != 3) {
                    AttemptToCatch(i++);
                    return;
                }
                console.log("Couldn't find anything yet");
                return;
            }
            console.log('Nice! you found something!');
            CatchPokemon();
        }
    });
}

function CheckLuck() {
    const _maxNum = 50000;
    var randNum = Math.floor(Math.random() * _maxNum) + 1;
    if (randNum % 11 === 0 || randNum % 7 === 0) {
        return true;
    }
    return false;
}

module.exports = {
    AttemptToCatch
}