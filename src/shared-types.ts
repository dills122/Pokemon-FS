export interface DataStorageFile {
  name: string;
  ["recent-searches"]: string[];
  ["p-inv"]: PokemonInventoryItem[];
  ["i-inv"]: any[];
}

export interface PokemonInventoryItem {
  name: string;
  base_stat: string;
  caught: string;
}

export type PokemonInvenory = PokemonInventoryItem[];
