import SearchHistory from "./search-history";
import Catch from "./catch";

export default async (): Promise<void> => {
  const canSearch = await SearchHistory.ReviewSearchHistory();
  if (canSearch) {
    Catch.AttemptToCatch();
  } else {
    console.log(
      "It seems this area is quiet. Maybe another area is more active"
    );
  }
};
