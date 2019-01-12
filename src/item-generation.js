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
var {Pokemon} = require('./models/pokemon');

function CatchPokemon() {
    GetPokemon().then(pokemon => {
        var pokemonArry = JSON.parse(pokemon);
        var caughtPokemon = GetRandomPokemon(pokemonArry);
        console.log(`Congrats you caught ${caughtPokemon}`);
        AddPokemonToInventory(caughtPokemon);
        // AddSearchEntry().then(val => {
        //     console.log("Added Search Entry");
        // });
    });
}

function AddPokemonToInventory(pokemon) {
    GetFileContent().then(content => {
        var json = JSON.parse(content);
        if (!json.hasOwnProperty('p-inv')) {
            json['p-inv'] = [];
        }
        return CheckInventory(json, pokemon, 'p');          
    }).then(updatedJson => {
        return WriteToFile(JSON.stringify(updatedJson));
    }).then(val => {
        
    }).catch(error => {
        console.log(error);
    });
    console.log('added');
}

async function CheckInventory(inv, item, type) {
    switch (type) {
        case 'i':
            return inv;
        case 'p':
            var obj = inv['p-inv'].find((o, i) => {
                if (o.name === item) {
                    //Add prompt for duplicate
                    //inv['p-inv'][i].count++;
                    console.log("Already have this pokemon stage");
                    return true;
                }
            });
            if (typeof obj === 'undefined' && !obj) {
                try {
                    var pokemon = await GetPokemonStats(item);
                    inv['p-inv'].push(pokemon);
                    return inv;
                } catch(error) {
                    console.log("In catch");
                    console.log(error);
                    var pokemon = new Pokemon(item, 110,110);
                    inv['p-inv'].push(pokemon);
                    return inv;
                }
            }
        default:
            return null;
    }
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