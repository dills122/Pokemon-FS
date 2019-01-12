const inquirer = require('inquirer');
const {
    GenerateQuestionObj
} = require('./q-builder');

function AttemptToCatch() {
    inquirer.prompt([GenerateQuestionObj()]).then((answers) => {
        console.log(`catch: ${answers.catch}`);
    });
}

module.exports = {
    AttemptToCatch
}