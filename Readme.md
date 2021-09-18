# Pokemon : File System Edition

[![CI Job](https://github.com/dills122/Pokemon-FS/actions/workflows/ci.action.yml/badge.svg)](https://github.com/dills122/Pokemon-FS/actions/workflows/ci.action.yml) [![CodeFactor](https://www.codefactor.io/repository/github/dills122/pokemon-fs/badge)](https://www.codefactor.io/repository/github/dills122/pokemon-fs)

<p align="center">
  <img width="150" height="150" src="./assets/logo.png" alt="Logo Image">
</p>

Welcome to NTFS, an uncharted area in the Pokémon universe, where nothing is like you know. NTFS is a virtual Pokémon world full of adventures throughout your file system. Explore directories in search of that rare pokemon and have a hell of a lot of fun along the way.

## Getting Started (Dev)

To install and run the development edition you need to install this app globally.

```bash
npm install -g {workingDir}\Catch-Em-All
```

Example Commands

```
# Running local (only good for testing out)
node ./catchem.js search

# Running globally
catchem search
```

> Once the search command is activated, the rest of the interaction is through interactive prompts.

## Searching

Currently the only command supported is `search`, which allows you to attempt to find pokemon to capture. If one is found, luck may have it that it'll want to pair up and join you on your journey.

Remove the dust from those unseen folders and catch a pokemon.

##### Tech Used

- [Commander](https://github.com/tj/commander.js/)
- [Hasha](https://github.com/sindresorhus/hasha)
- [Inquirer](https://github.com/SBoudrias/Inquirer.js/)
- [app-root-path](https://github.com/inxilpro/node-app-root-path)
