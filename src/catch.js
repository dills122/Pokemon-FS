const inquirer = require('inquirer');
const {
    GenerateQuestionObj
} = require('./q-builder');

function AttemptToCatch(i) {
    i = i ? i : 0;
    inquirer.prompt([GenerateQuestionObj()]).then((answers) => {
        if (!answers.catch.includes('N')) {
            if (!CheckLuck()) {
                if (i != 3) {
                    AttemptToCatch(i++);
                }
                console.log("Couldn't find anything yet");
                return;
            }
            console.log('Nice! you found something!');
        }
    });
}

function CheckLuck() {
    const _maxNum = 50000;
    var randNum = Math.floor(Math.random() * _maxNum) + 1;
    console.log(randNum);
    if (randNum % 2 || randNum % 7) {
        return true;
    }
    return false;
}

module.exports = {
    AttemptToCatch
}