const hasha = require('hasha');
const {
    GetFileContent,
    WriteToFile
} = require('./file-io');

const _maxHistorySize = 500;

function HashSearchEntry() {
    let hours = new Date().getHours();
    let currDir = process.cwd();
    return hasha(currDir + hours);
}

async function ReviewSearchHistory() {
    let searchHistory = await GetFileContent();
    searchHistory = JSON.parse(searchHistory);
    searchHistory["recent-searches"] = CleanUpSearchHistory(searchHistory["recent-searches"]);
    let currDirHash = HashSearchEntry();
    return CheckHistory(searchHistory["recent-searches"], currDirHash);
}

function CleanUpSearchHistory(searchHistory) {
    let historyLength = searchHistory.length;
    if(historyLength >= _maxHistorySize) {
        var halfLength = Math.ceil(historyLength /2);
        return searchHistory.splice(halfLength, historyLength -1);
    }
    return searchHistory;
}

function CheckHistory(searchHistory, searchEntryHash) {
    let CanSearch = true;
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
    let searchHistory = await GetFileContent();
    searchHistory = JSON.parse(searchHistory);
    searchHistory["recent-searches"].push(HashSearchEntry());
    let value = await WriteToFile(JSON.stringify(searchHistory));
    //Just testing this
    return value;
}

module.exports = {
    ReviewSearchHistory,
    AddSearchEntry,
}