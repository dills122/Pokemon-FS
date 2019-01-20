const {
    GetPokemonStats
} = require('./api-access');
const {
    GetFileContent
} = require('./file-io');
const inquirer = require('inquirer');

function Battle(foundPokemon) {
    var battlingPokemon;
    SetupBattle(foundPokemon).then(results => {
        battlingPokemon = results.battlePokemon;
        return PickPokemonPrompt(battlingPokemon, results.playInv);
    }).then(answers => {
        let playerPokemon = answers.battle;
        return BattlePrompt(battlingPokemon, playerPokemon);
    }).then(vals => {console.log(vals)});

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
        message: `You found a ${battlingPokemon.name}, with power ${battlingPokemon.power}, which Pokemon do you want to use?`,
        choices: pInv.map(pokie => `${pokie.name}: ${pokie.power}`)
    };
    return inquirer.prompt([pickPokemonObj]);
}

async function BattlePrompt(battlingPokemon, playerPokemon) {
    for (let i = 0; i < 3; i++) {
        var answer = await BuildBattlePrompt(`${battlingPokemon.name}: ${battlingPokemon.power}`);
        if (answer.battle === 'Run') {
            return false;
        }
    }
    return true;
}

function BuildBattlePrompt(battlePokemonStr) {
    return inquirer.prompt([{
        name: 'battle',
        type: 'list',
        message: `Your opponent is ${battlePokemonStr}, do you want to fight?`,
        choices: ['Fight', 'Run']
    }]);
}

function FightPokemon(pokemonOne, pokemonTwo) {
    
}


module.exports = {
    Battle
}