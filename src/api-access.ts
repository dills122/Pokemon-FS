import got from "got";

const BaseURL = "https://pokeapi.co/api/v2";

interface PokemonStatsResponse {
  stats: PokemonStats;
}

export interface PokemonStats {
  base_stat: number;
}

export default abstract class APIAccess {
  public static async GetStats(name: string): Promise<PokemonStats> {
    const resp = await got<PokemonStatsResponse>(
      `${BaseURL}/pokemon/${name.toLowerCase()}`
    );
    return resp.body.stats;
  }
}
