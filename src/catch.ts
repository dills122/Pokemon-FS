import inquirer from "inquirer";
import { GetPokemon } from "./file-io";
const { GenerateQuestionObj } = require("./q-builder");
const { CatchPokemon, GetRandomPokemon } = require("./item-generation");
const { Battle } = require("./battle");

export default abstract class Catch {
  public static AttemptToCatch(): void {
    const luck = this.CheckLuck();
    if (!luck) {
      console.log("Couldn't find anything yet");
      return;
    }
    this.DisplayPrompt();
  }
  private static CheckLuck(): boolean {
    const _maxNum = 50000;
    const randNum = Math.floor(Math.random() * _maxNum) + 1;
    if (randNum % 5 === 0 || randNum % 11 === 0) {
      return true;
    }
    return false;
  }
  private static async DisplayPrompt(): Promise<void> {
    try {
      const questionList = GenerateQuestionObj();
      //TODO look into how to properly type this
      const answers = await inquirer.prompt([questionList]);
      if (answers.catch.includes("N")) {
        return;
      }
      console.log("Nice! you found something!");
      let foundPokemon = "";
      const Pokemon = await GetPokemon();
      foundPokemon = GetRandomPokemon(JSON.parse(Pokemon.toString("utf8")));
      const isWon = await Battle(foundPokemon);
      if (isWon) {
        CatchPokemon(foundPokemon);
      } else {
        console.log(`Your fight with ${foundPokemon} was unsuccessful`);
      }
    } catch (err) {
      //Need to add some type of logging here also
    }
  }
}
