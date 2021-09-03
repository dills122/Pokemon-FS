import { PokemonInventoryItem } from "../shared-types";

export default class Pokemon {
  private name: string;
  private caughtDate: string;
  constructor(data: PokemonInventoryItem) {
    this.name = data.name;
    this.caughtDate = data.caught;
  }
  getName(): string {
    return this.name;
  }
  getCaughtDate(): string {
    return this.caughtDate;
  }
}
