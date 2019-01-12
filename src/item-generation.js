const {
    GetPokemon,
    GetFileContent,
    WriteToFile
} = require('./file-io');

function CatchPokemon() {
    GetPokemon().then(pokemon => {
        var pokemonArry = JSON.parse(pokemon);
        var caughtPokemon = GetRandomPokemon(pokemonArry);
        console.log(`Congrats you caught ${caughtPokemon}`);
        AddPokemonToInventory(caughtPokemon);
    });
}

function AddPokemonToInventory(pokemon) {
    GetFileContent().then(content => {
        var json = JSON.parse(content);
        if (!json.hasOwnProperty('p-inv')) {
            json['p-inv'] = [];
        }
        var updatedJson = CheckInventory(json, pokemon, 'p');

        return WriteToFile(JSON.stringify(updatedJson));
    }).then(val => {

    });
}

function CheckInventory(inv, item, type) {
    switch (type) {
        case 'i':
            return inv;
        case 'p':
            var obj = inv['p-inv'].find((o, i) => {
                if (o.name === item) {
                    inv['p-inv'][i].count++;
                    return true;
                }
            });
            if (typeof obj === 'undefined' && !obj) {
                inv['p-inv'].push({
                    name: item,
                    count: 1
                });
            }
            return inv;
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