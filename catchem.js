const program = require('commander');
const pokemon = require('./src/data/en');
const {
    CheckForPokemon
} = require('./src/search');


function init() {
    console.log("Welcome to Catch Em All");
    if(process.argv.length <= 2) {
        console.log("need to have command args");
    }

    program
        .version('0.1.0')
        .description('Stock info at your terminal');

    program
        .command('search')
        .alias('s')
        .action(() => {
            //Logic for searching the current and child directories for pokemon
            CheckForPokemon();
        });

    program
        .command('catch <name>')
        .alias('c')
        .action((name) => {
            //Logic for catching one of the pokemon in the current directory
        });

    program.parse(process.argv);
}


module.exports = {
    init,
}