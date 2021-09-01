import PokeAPI from "pokeapi-typescript";
import { PokemonInventoryItem } from "./shared-types";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PokemonData extends PokemonInventoryItem {}
export default abstract class APIAccess {
  public static async GetPokemonDetails(
    pokemonName: string
  ): Promise<PokemonData> {
    const pokemonData = await PokeAPI.Pokemon.resolve(pokemonName);
    return {
      name: pokemonData.name,
      caught: new Date().toISOString(),
    };
  }
}
