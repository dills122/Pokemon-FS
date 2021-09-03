import { GetFileContent, WriteToDataStorageFile } from "../file-io";
import {
  DataStorageFile,
  PokemonInvenory,
  RequestedDataFileUpdates,
} from "../shared-types";

export default class DataFile {
  private dataFile: DataStorageFile;

  async init(): Promise<void> {
    try {
      await this.loadContents();
    } catch (err) {
      console.error("Unable to load your player data");
      throw err;
    }
  }

  private async loadContents() {
    const fileBuffer = await GetFileContent();
    this.dataFile = JSON.parse(fileBuffer.toString("utf8"));
  }

  getSearchHistory(): string[] {
    if (!this.dataFile) {
      throw Error("No data file loaded yet");
    }
    return this.dataFile["recent-searches"];
  }

  getInventory(): PokemonInvenory {
    if (!this.dataFile) {
      throw Error("No data file loaded yet");
    }
    return this.dataFile["p-inv"];
  }

  async updateFile(updates: RequestedDataFileUpdates): Promise<void> {
    if (updates.searchHistoryUpdates && updates.searchHistoryUpdates.length) {
      this.dataFile["recent-searches"] = updates.searchHistoryUpdates;
    }
    if (updates.inventoryUpdates) {
      this.dataFile["p-inv"] = updates.inventoryUpdates;
    }
    await WriteToDataStorageFile(this.dataFile);
  }
}
