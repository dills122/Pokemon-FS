var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

async function GetPokemonStats(name) {
    var pokemonStats = await P.getPokemonByName(name);
    var baseStat = pokemonStats[0]['base_stat'];

    return {
        name: name,
        power: baseStat,
        defense: baseStat
    };
}

module.exports = {
    GetPokemonStats
}