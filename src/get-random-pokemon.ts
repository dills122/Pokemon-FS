import { GetPokemon } from "./file-io";
import { PokemonNames } from "./shared-types";

export default async (): Promise<string> => {
  const Pokemon = await GetPokemon();
  const pokemonList: PokemonNames = JSON.parse(Pokemon.toString("utf8"));
  const arrayLength = pokemonList.length;
  const indices: number[] = [];
  for (let i = 0; i < 3; i++) {
    const randIndex = Math.floor(Math.random() * (arrayLength - 0 + 1) + 0);
    indices.push(randIndex);
  }
  const winner = indices[Math.floor(Math.random() * (2 - 0 + 1) + 0)];
  return pokemonList[winner];
};
