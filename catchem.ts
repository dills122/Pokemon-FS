import program from "commander";
import LookForPokemon from "./src/search";
(() => {
  console.log("Welcome to Catch Em All");

  if (process.argv.length <= 2) {
    console.log("need to have command args");
  }

  program.version("0.1.0").description("Stock info at your terminal");

  program
    .command("search")
    .alias("s")
    .action(async () => {
      //Logic for searching the current and child directories for pokemon
      await LookForPokemon();
    });

  program
    .command("catch <name>")
    .alias("c")
    .action(() => {
      //Logic for catching one of the pokemon in the current directory
    });

  program.parse(process.argv);
})();
