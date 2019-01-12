const {
    GetPokemon
} = require('./file-io');

function CatchPokemon() {
    GetPokemon().then(pokemon => {
        var pokemonArry = JSON.parse(pokemon);
        var caughtPokemon = GetRandomPokemon(pokemonArry);
        console.log(`Congrats you caught ${caughtPokemon}`);
    });
}

function GetRandomPokemon(pokieArry) {
    var arrayLength = pokieArry.length;
    var indices = [];

    for(var i = 0; i < 3; i++) {
        var randIndex = Math.floor(Math.random() * (arrayLength - 0 + 1) + 0);
        indices.push(randIndex);
    }
    var winner = indices[Math.floor(Math.random() * (2 - 0 + 1) + 0)];
    return pokieArry[winner];
}

module.exports = {
    CatchPokemon
}