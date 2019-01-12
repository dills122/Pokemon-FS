var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();
var {Pokemon} = require('./models/pokemon');

async function GetPokemonStats(name) {
    // var pokemonStats = await P.getPokemonByName(name.toLowerCase());
    // var baseStat = pokemonStats['stats'][0]['base_stat'];
    // var pokemon = new Pokemon(name,baseStat,baseStat);
    return new Pokemon(name, 110,110);
}

module.exports = {
    GetPokemonStats
}