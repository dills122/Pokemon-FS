const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const util = require('util');
var appRoot = require('app-root-path');

//Constant Variables
const recentSearchesFile = appRoot + '/src/data/rs.json';
const pokemonListFile = appRoot + '/src/data/en.json';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function GetFileContent() {
    return await readFile(recentSearchesFile);
}

async function GetPokemon() {
    return await readFile(pokemonListFile);
}

async function WriteToFile(contents) {
    return await writeFile(recentSearchesFile,contents);
}

module.exports = {
    GetFileContent,
    WriteToFile,
    GetPokemon
}