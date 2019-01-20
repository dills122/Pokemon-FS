const {
    GetPokemonStats
} = require('./api-access');
const {
    GetFileContent
} = require('./file-io');
const inquirer = require('inquirer');

function Battle(foundPokemon) {
    SetupBattle(foundPokemon).then(results => {
        return PickPokemonPrompt();
    }).then(answers => {
        let playerPokemon = answers.battle;
        return BattlePrompt(battlingPokemon, playerPokemon);
    }).then(vals => {

    });

}

async function SetupBattle(foundPokemon) {
    try {
        let foundPokemonObj = await GetPokemonStats(foundPokemon);
        let userData = await GetFileContent();
        return {
            battlePokemon: foundPokemonObj,
            playInv: JSON.parse(userData)['p-inv']
        };
    } catch (error) {

    }
    return {};
}

function PickPokemonPrompt(battlingPokemon, pInv) {
    let pickPokemonObj = {
        name: 'battle',
        type: 'list',
        message: `You found a ${battlingPokemon.name}, with power ${battlePokemon.power}, which Pokemon do you want to use?`,
        choices: pInv.map(pokie => `${pokie.name}: ${pokie.power}`)
    }
    return inquirer.prompt([pickPokemonObj]);
}

async function BattlePrompt(battlingPokemon, playerPokemon) {
    for (let i = 0; i < 3; i++) {

    }
}

function BuildBattlePrompt(battlePokemonStr, playerPokemonStr) {
 
}


module.exports = {
    Battle
}