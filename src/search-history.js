const fs = require('fs');
const hasha = require('hasha');
const readline = require('readline');
const stream = require('stream');

//Constant Variables
const recentSearchesFile = './src/data/recent-searches.txt';


function CheckRecentSearches(currentPath) {
    return new Promise((resolve, reject) => {
        // (async () => {
            
        //     const rl = readline.createInterface({
        //         input: fileStream,
        //         crlfDelay: Infinity
        //     });
        //     try {
        //         for await (const line of rl) {
        //             // Each line in input.txt will be successively available here as `line`.
        //             console.log(`Line from file: ${line}`);
        //             if (currentPath === line) {
        //                 reject("Already searched here");
        //                 break;
        //             }
        //         }
        //         resolve(true);
        //     } catch (e) {
        //         console.log(e.stack);
        //         reject("Error has occured");
        //     }
        // })();
        const fileStream = fs.createReadStream(recentSearchesFile);
        function readLines({ input }) {
            const output = new stream.PassThrough({ objectMode: true });
            const rl = readline.createInterface({ input });
            rl.on("line", line => { 
              output.write(line);
            });
            rl.on("close", () => {
              output.push(null);
            }); 
            return output;
          }

          (async () => {
            for await (const line of readLines({ fileStream })) {
              console.log(line);
            }
          })();

    });
}

function AddSearchResult(newPath) {
    var stream = fs.createWriteStream(recentSearchesFile, {
        flags: 'a'
    });
    var hashValue = HashValue(newPath);
    stream.write(hashValue + '\n');
    console.log(hashValue);
}

function CleanUpResults() {

}

function HashValue(value) {
    return hasha(value);
}

function ReviewSearchHistory(path) {
    CheckRecentSearches(path).then(val => {
        if (exists) {
            console.log("Cannot search here again for some time");
        }
        AddSearchResult(path);
        CleanUpResults();
    }).catch(error => {
        console.log('Errors');
    });

}

module.exports = {
    ReviewSearchHistory,
}