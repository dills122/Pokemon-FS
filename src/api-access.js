var {
    Pokemon
} = require('./models/pokemon');
var rp = require('request-promise-native');

async function GetPokemonStats(name) {
    var reqStr = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
    var resp = await rp(reqStr);
    resp = JSON.parse(resp);
    var baseStat = resp.stats[0].base_stat;
    var pokemon = new Pokemon(name, baseStat, baseStat);
    return pokemon;
}

module.exports = {
    GetPokemonStats
}