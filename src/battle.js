const {
    GetPokemonStats
} = require('./api-access');
const {
    GetFileContent
} = require('./file-io');
const inquirer = require('inquirer');
const {
    CalculateValue
} = require('./helpers');
const {
    Pokemon
} = require('./models/pokemon');

function Battle(foundPokemon) {
    var battlingPokemon;
    SetupBattle(foundPokemon).then(results => {
        battlingPokemon = results.battlePokemon;
        return PickPokemonPrompt(battlingPokemon, results.playInv);
    }).then(answers => {
        let [name, power] = answers.battle.split(" ");
        let playerPokemon = new Pokemon(name.substring(0, name.length - 1), power);
        return BattlePrompt(battlingPokemon, playerPokemon);
    }).then(vals => {
        console.log(vals);
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
        message: `You found a ${battlingPokemon.name}, with power ${battlingPokemon.power}, which Pokemon do you want to use?`,
        choices: pInv.map(pokie => `${pokie.name}: ${pokie.power}`)
    };
    return inquirer.prompt([pickPokemonObj]);
}

async function BattlePrompt(battlingPokemon, playerPokemon) {
    for (let i = 0; i < 3; i++) {
        if (battlingPokemon.power <= 0 || playerPokemon.power <= 0) {
            return false;
        }

        let answer = await BuildBattlePrompt(`${battlingPokemon.name}: ${battlingPokemon.power}`);

        if (answer.battle === 'Run') {
            return false;
        }
        var {
            pokemonOne,
            pokemonTwo
        } = FightPokemon(battlingPokemon, playerPokemon);
        console.log(`Battling Pokemon, ${battlingPokemon.name}, is at ${battlingPokemon.power} power`);
        console.log(`Your Pokemon, ${playerPokemon.name}, is at ${playerPokemon.power} power`);
        battlingPokemon = pokemonOne;
        playerPokemon = pokemonTwo;
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
    let PD = PercentDifference(pokemonOne.power, pokemonTwo.power);
    let LB = LowerBond(PD);
    let UB = Math.ceil(LB * 1.6);
    // let powerOne = pokemonOne.power;
    // let powerTwo = pokemonTwo.power;
    // console.log(CalculateValue(powerOne, 1.3));
    // if (CalculateValue(powerOne, 1.3) >= powerTwo) {
    //     pokemonTwo.power -= Math.floor(Math.random() * (20 - 0 + 1) + 0);
    //     return {
    //         pokemonOne,
    //         pokemonTwo
    //     };
    // }

    // if (CalculateValue(powerTwo, 1.3) >= powerOne) {
    //     pokemonOne.power -= Math.floor(Math.random() * (25 - 0 + 1) + 0);
    //     return {
    //         pokemonOne,
    //         pokemonTwo
    //     };
    // }

    if(pokemonOne.power > pokemonTwo.power) {
        pokemonOne.power -= getRndInteger(LB,UB);
        pokemonTwo.power -= getRndInteger(0,(UB -LB));
    } else {
        pokemonOne.power -= getRndInteger(0,(UB -LB));
        pokemonTwo.power -= getRndInteger(LB,UB);
    }
    
    pokemonOne.power = pokemonOne.power <= 0 ? 0 : pokemonOne.power;
    pokemonTwo.power = pokemonTwo.power <= 0 ? 0 : pokemonTwo.power;
    return {
        pokemonOne,
        pokemonTwo
    };
}

function PercentDifference(valOne, valTwo) {
    let valDiff = Math.abs(valOne - valTwo);
    let valAvg = Math.ceil(((valOne + valTwo)/2));
    return Math.ceil(((valDiff/valAvg) * 100));
}

function LowerBond(PD) {
    return Math.ceil(((PD/2)+PD)/2);
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }


module.exports = {
    Battle
}