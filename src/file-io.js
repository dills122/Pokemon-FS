const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const util = require('util');

//Constant Variables
const recentSearchesFile = './src/data/rs.json';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function GetFileContent() {
    return await readFile(recentSearchesFile);
}

async function WriteToFile(contents) {
    return await writeFile(recentSearchesFile,contents);
}

module.exports = {
    GetFileContent,
    WriteToFile
}