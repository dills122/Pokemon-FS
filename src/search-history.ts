import hasha from "hasha";
import { GetFileContent, WriteToFile } from "./file-io";

const _maxHistorySize = 500;

export default abstract class SearchHistory {
  public static async ReviewSearchHistory(): Promise<boolean> {
    const searchHistory = await this.GetSearchHistory();
    searchHistory["recent-searches"] = this.CleanUpSearchHistory(
      searchHistory["recent-searches"]
    );
    const currDirHash = this.HashSearchEntry();
    return this.CheckHistory(searchHistory["recent-searches"], currDirHash);
  }
  public static async AddSearchEntry(): Promise<void> {
    const searchHistory = await this.GetSearchHistory();
    searchHistory["recent-searches"].push(this.HashSearchEntry());
    await WriteToFile(JSON.stringify(searchHistory));
  }
  private static async GetSearchHistory() {
    try {
      const searchHistory = await GetFileContent();
      return JSON.parse(searchHistory.toString("utf8"));
    } catch (err) {
      //Need to add logging of some sort for errors
      return false;
    }
  }
  private static HashSearchEntry() {
    const hours = new Date().getHours();
    const currDir = process.cwd();
    return hasha(currDir + hours);
  }
  private static CleanUpSearchHistory(searchHistory) {
    const historyLength = searchHistory.length;
    if (historyLength >= _maxHistorySize) {
      const halfLength = Math.ceil(historyLength / 2);
      return searchHistory.splice(halfLength, historyLength - 1);
    }
    return searchHistory;
  }
  private static CheckHistory(searchHistory, searchEntryHash) {
    let CanSearch = true;
    searchHistory.some((value) => {
      if (value === searchEntryHash) {
        CanSearch = false;
        return true;
      }
      return value === searchEntryHash;
    });
    return CanSearch;
  }
}
