import fs from "fs";
import util from "util";
import appRoot from "app-root-path";
import { DataStorageFile } from "./shared-types";

//Constant Variables
const recentSearchesFile = appRoot + "/src/data/rs.json";
const pokemonListFile = appRoot + "/src/data/en.json";

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function GetFileContent(): Promise<Buffer> {
  return await readFile(recentSearchesFile);
}

async function GetPokemon(): Promise<Buffer> {
  return await readFile(pokemonListFile);
}

async function WriteToDataStorageFile(
  contents: DataStorageFile
): Promise<void> {
  return await writeFile(recentSearchesFile, JSON.stringify(contents));
}

export default {
  GetFileContent,
  GetPokemon,
  WriteToDataStorageFile,
};
export { GetFileContent, GetPokemon, WriteToDataStorageFile };
