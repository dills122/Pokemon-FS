import hasha from "hasha";
import DataFile from "./data-file";

const _maxHistorySize = 500;

export default class SearchHistory {
  private dataFileObject: DataFile;
  private searchHistory: string[];

  async init(): Promise<void> {
    this.dataFileObject = new DataFile();
    await this.dataFileObject.init();
    this.searchHistory = this.dataFileObject.getSearchHistory();
  }

  public ReviewSearchHistory(): boolean {
    this.CleanUpSearchHistory();
    const currDirHash = this.HashSearchEntry();
    return this.CheckHistory(currDirHash);
  }

  public async AddSearchEntry(): Promise<void> {
    this.searchHistory.push(this.HashSearchEntry());
    await this.dataFileObject.updateFile({
      searchHistoryUpdates: this.searchHistory,
    });
  }

  private HashSearchEntry() {
    const hours = new Date().getHours();
    const currDir = process.cwd();
    return hasha(currDir + hours);
  }

  private CleanUpSearchHistory() {
    const historyLength = this.searchHistory.length;
    if (historyLength >= _maxHistorySize) {
      const halfLength = Math.ceil(historyLength / 2);
      this.searchHistory = this.searchHistory.splice(
        halfLength,
        historyLength - 1
      );
    }
  }

  private CheckHistory(searchEntryHash: string) {
    let CanSearch = true;
    this.searchHistory.some((value) => {
      if (value === searchEntryHash) {
        CanSearch = false;
        return true;
      }
      return value === searchEntryHash;
    });
    return CanSearch;
  }
}
