import { GetFileContent, WriteToFile } from "./file-io";
import { PokemonInvenory } from "./shared-types";

export class Inventory {}

export class PokemonInventory extends Inventory {
  private inventory: PokemonInvenory;
  constructor() {
    super();
  }
  async init(): Promise<void> {
    await this.loadPlayerInventoryFromFile();
  }
  private async loadPlayerInventoryFromFile() {
    const contentBuffer = await GetFileContent();
    this.inventory = JSON.parse(contentBuffer.toString("utf-8"));
  }
  async add() {
    if (!this.inventory) {
      await this.loadPlayerInventoryFromFile();
    }
  }
}
