const pokemon = require('./data/en');
const {
    ReviewSearchHistory
} = require('./search-history');
const util = require('util');
const {
    AttemptToCatch
} = require('./catch');

function CheckForPokemon() {
    console.log("Searching...");
    ReviewSearchHistory().then(CanSearch => {
        if (CanSearch) {
            Search();
        } else {
            CantSearch();
        }
    });
}

function Search() {
    AttemptToCatch();
}

function CantSearch() {
    console.log("It seems this area is quiet. Maybe another area is more active");
}

module.exports = {
    CheckForPokemon
}