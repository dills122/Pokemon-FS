const _possibleQuestions = ["Something is rustling in the bushes, wanna go check it out?",
    "Nice! you found an item, wanna pick it up?",
    "Hmm nothing stuck out as interesting, wanna check again?"
];

function GenerateQuestionText() {
    var qLength = _possibleQuestions.length -1;
    var randIndex = Math.floor(Math.random() * (qLength - 0 + 1) + 0);
    return _possibleQuestions[randIndex];
}

function GenerateQuestionObj() {
    var qText = GenerateQuestionText();
    return {
        name: 'catch',
        type: 'list',
        message: qText,
        choices: ['Hell yeah', 'Sure', 'Nah']
    }
}

module.exports = {
    GenerateQuestionObj
}