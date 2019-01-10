const pokemon = require('./data/en');
const {ReviewSearchHistory} = require('./search-history');

function CheckForPokemon() {
    var currDir = process.cwd();
    console.log(currDir);
    ReviewSearchHistory(currDir.toString());
}

module.exports = {
    CheckForPokemon
}

