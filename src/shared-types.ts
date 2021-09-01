export interface DataStorageFile {
  name: string;
  ["recent-searches"]: string[];
  ["p-inv"]: PokemonInvenory;
  ["i-inv"]: any[];
}

export interface PokemonInventoryItem {
  name: string;
  caught: string;
}

export type PokemonInvenory = PokemonInventoryItem[];

export type PokemonNames = string[];

export interface RequestedDataFileUpdates {
  searchHistoryUpdates?: string[];
  inventoryUpdates?: PokemonInvenory;
}
