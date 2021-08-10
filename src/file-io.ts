import fs from "fs";
import util from "util";
import appRoot from "app-root-path";

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

async function WriteToFile(contents: string): Promise<void> {
  return await writeFile(recentSearchesFile, contents);
}

export default {
  GetFileContent,
  GetPokemon,
  WriteToFile,
};
export { GetFileContent, GetPokemon, WriteToFile };
