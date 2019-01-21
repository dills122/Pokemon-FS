const {
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

function CatchPokemon(pokemon) {
    GetFileContent()
        .then(content => {
            console.log(`Congrats you caught ${pokemon}`);
            let json = JSON.parse(content);
            if (!json.hasOwnProperty('p-inv')) {
                json['p-inv'] = [];
            }
            return AddPokemon(json, pokemon);
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
    let inventory = json['p-inv'];
    let alreadyCaught = CheckInvForPokemon(inventory,pokemonName);

    if (typeof alreadyCaught === 'undefined' && !alreadyCaught) {
        try {
            var pokemon = await GetPokemonStats(pokemonName);
            inventory.push(pokemon);
            json['p-inv'] = inventory;
            return json;
        } catch (error) {
            console.log(error);
        }
        let genPokemon = new Pokemon(pokemonName, 110, 110);
        inventory.push(genPokemon);
        json['p-inv'] = inventory;
        return json;
    }
    return json;
}

function CheckInvForPokemon(inventory,pokemonName) {
    return inventory.find(o => {
        if (o.name === pokemonName) {
            return true;
        }
    });
}

function GetRandomPokemon(pokieArry) {
    let arrayLength = pokieArry.length;
    let indices = [];
    for (var i = 0; i < 3; i++) {
        let randIndex = Math.floor(Math.random() * (arrayLength - 0 + 1) + 0);
        indices.push(randIndex);
    }
    let winner = indices[Math.floor(Math.random() * (2 - 0 + 1) + 0)];
    return pokieArry[winner];
}

module.exports = {
    CatchPokemon,
    GetRandomPokemon
}