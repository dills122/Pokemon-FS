import inquirer from "inquirer";
import Question from "./question-builder";
import GetRandomPokemon from "./get-random-pokemon";
import { PokemonInventory } from "./classes/inventory";

export default abstract class Catch {
  public static async AttemptToCatch(): Promise<void> {
    const luck = this.CheckLuck();
    if (!luck) {
      console.log("Couldn't find anything yet");
      return;
    }
    await this.DisplayPrompt();
  }
  private static async Catch(): Promise<void> {
    const foundPokemon = await GetRandomPokemon();
    const inv = new PokemonInventory();
    await inv.init();
    await inv.add(foundPokemon);
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
    const questionList = new Question().getQuestionPromptObject();
    //TODO look into how to properly type this
    const answers = await inquirer.prompt([questionList]);
    if (answers.catch.includes("N")) {
      return;
    }
    console.log("Nice! you found something!");
    await this.Catch();
  }
}
