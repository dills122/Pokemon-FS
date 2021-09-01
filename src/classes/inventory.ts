import DataFile from "./data-file";
import { PokemonInvenory } from "../shared-types";

export class Inventory {}

export class PokemonInventory extends Inventory {
  private inventory: PokemonInvenory;
  private dataFileObject: DataFile;
  constructor() {
    super();
  }
  async init(): Promise<void> {
    this.dataFileObject = new DataFile();
    await this.dataFileObject.init();
    this.inventory = this.dataFileObject.getInventory();
  }
  canAddPokemon(pokemonToAdd: string): boolean {
    return this.inventory.some((pokemon) => pokemon.name === pokemonToAdd);
  }
  async add(pokemonToAdd: string): Promise<void> {
    if (!this.inventory) {
      throw Error("No inventory loaded");
    }
    if (!this.canAddPokemon(pokemonToAdd)) {
      return;
    }
    this.inventory.push({
      name: pokemonToAdd,
      caught: new Date().toISOString(),
    });
    await this.dataFileObject.updateFile({
      inventoryUpdates: this.inventory,
    });
  }
}
