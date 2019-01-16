const {
    GetPokemon,
    GetFileContent,
    WriteToFile
} = require('./file-io');
const {
    AddSearchEntry
} = require('./search-history');
const {
    GetPokemonStats
} = require('./api-access');
var {
    Pokemon
} = require('./models/pokemon');

function CatchPokemon() {
    var newPokemon = "";
    GetPokemon().then(pokemon => {
            var pokemonArry = JSON.parse(pokemon);
            var caughtPokemon = GetRandomPokemon(pokemonArry);
            newPokemon = caughtPokemon;
            console.log(`Congrats you caught ${caughtPokemon}`);
            return GetFileContent();
        }).then(content => {
            var json = JSON.parse(content);
            if (!json.hasOwnProperty('p-inv')) {
                json['p-inv'] = [];
            }
            return AddPokemon(json, newPokemon);
        }).then(updatedJson => {
            return WriteToFile(JSON.stringify(updatedJson));
        }).then(val => {
            return AddSearchEntry();
        }).then(val => {
            return;
        })
        .catch(error => {
            console.log(error);
        });
}

async function AddPokemon(json, pokemonName) {
    var inventory = json['p-inv'];
    var existingObj = inventory.find(o => {
        if (o.name === pokemonName) {
            return true;
        }
    });
    if (typeof existingObj === 'undefined' && !existingObj) {
        try {
            var pokemon = await GetPokemonStats(pokemonName);
            inventory.push(pokemon);
            json['p-inv'] = inventory;
            return json;
        } catch (error) {
            console.log(error);
        }
        var genPokemon = new Pokemon(pokemonName, 110, 110);
        inventory.push(genPokemon);
        json['p-inv'] = inventory;
    }
    return json;
}

function GetRandomPokemon(pokieArry) {
    var arrayLength = pokieArry.length;
    var indices = [];

    for (var i = 0; i < 3; i++) {
        var randIndex = Math.floor(Math.random() * (arrayLength - 0 + 1) + 0);
        indices.push(randIndex);
    }
    var winner = indices[Math.floor(Math.random() * (2 - 0 + 1) + 0)];
    return pokieArry[winner];
}

module.exports = {
    CatchPokemon
}