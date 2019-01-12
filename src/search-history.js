const hasha = require('hasha');
const readline = require('readline');
const stream = require('stream');
const {
    GetFileContent,
    WriteToFile
} = require('./file-io');

const _maxHistorySize = 500;

function HashSearchEntry() {
    var hours = new Date().getHours();
    var currDir = process.cwd();
    return hasha(currDir + hours);
}

async function ReviewSearchHistory() {
    var searchHistory = await GetFileContent();
    searchHistory = JSON.parse(searchHistory);
    var currDirHash = HashSearchEntry();
    return CheckHistory(searchHistory["recent-searches"], currDirHash);
}

function CleanUpSearchHistory(searchHistory) {
    // var i = searchHistory.length;
    // while (i--) {
    //     if (searchHistory[i] === HashSearchEntry()) {
    //         searchHistory.splice(i, 1);
    //     }
    // }
    // return searchHistory;
    var historyLength = searchHistory.length;
    if(historyLength >= _maxHistorySize) {
        var halfLength = Math.ceil(historyLength /2);
        return searchHistory.splice(halfLength, historyLength -1);
    }
}

function CheckHistory(searchHistory, searchEntryHash) {
    var CanSearch = true;
    searchHistory.some(value => {
        if (value === searchEntryHash) {
            CanSearch = false;
            return true;
        }
        return (value === searchEntryHash);
    });
    return CanSearch;
}

async function AddSearchEntry() {
    var searchHistory = await GetFileContent();
    searchHistory = JSON.parse(searchHistory);
    searchHistory["recent-searches"].push(HashSearchEntry());
    var value = await WriteToFile(JSON.stringify(searchHistory));
    //Just testing this
    return value;
}

module.exports = {
    ReviewSearchHistory,
    AddSearchEntry
}