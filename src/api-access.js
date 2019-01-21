var {
    Pokemon
} = require('./models/pokemon');
var rp = require('request-promise-native');

async function GetPokemonStats(name) {
    let reqStr = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
    var pokemon = new Pokemon(name, 110,110);
    try {
        let resp = await rp(reqStr);
        resp = JSON.parse(resp);
        var baseStat = resp.stats[0].base_stat;
        pokemon = new Pokemon(name, baseStat, baseStat);
        return pokemon;
    } catch(error) {
        //If the pokemon wasn't found
    }
    return pokemon;
}

module.exports = {
    GetPokemonStats
}