import SearchHistory from "./classes/search-history";
import Catch from "./catch";

export default async (): Promise<void> => {
  try {
    const searchHistoryObj = new SearchHistory();
    await searchHistoryObj.init();
    const canSearch = searchHistoryObj.ReviewSearchHistory();
    if (canSearch) {
      await Catch.AttemptToCatch();
    } else {
      return console.log(
        "It seems this area is quiet. Maybe another area is more active"
      );
    }
    await searchHistoryObj.AddSearchEntry();
  } catch (err) {
    console.error(
      "We are having some troubles searching at the moment, try again later"
    );
  }
};
