const pokemon = require('./data/en');
const {
    ReviewSearchHistory,
    AddSearchEntry
} = require('./search-history');
const util = require('util');

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
    //Need to start interactive CLI for catching Pokemon
    AddSearchEntry().then(val => {
        console.log("Added Search Entry");
    });
}

function CantSearch() {
    console.log("It seems this area is quiet. Maybe another area is more active");
}

module.exports = {
    CheckForPokemon
}