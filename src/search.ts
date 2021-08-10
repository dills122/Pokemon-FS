import SearchHistory from "./search-history";
const { AttemptToCatch } = require("./catch");

export default async (): Promise<void> => {
  const canSearch = await SearchHistory.ReviewSearchHistory();
  if (canSearch) {
    AttemptToCatch();
  } else {
    console.log(
      "It seems this area is quiet. Maybe another area is more active"
    );
  }
};
