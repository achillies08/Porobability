import MatchData from "./dbSchema.js";
import { disconnectMongoDb } from "./mongoConnection.js";

async function saveData(data) {
  const matchData = new MatchData({
    title: data.metadata.matchId,
    matchSummary: data,
  });
  matchData.save((err, dat) => {
    if (err) {
      console.error(
        "Error saving match summary for match ID: ",
        data.metadata.matchId
      );
    } else {
      console.log(
        "Data saved successfully for match ID: ",
        data.metadata.matchId
      );
    }
  });
}

async function clearDb() {
  MatchData.deleteMany({}, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Database cleared.");
    }
  });
  await disconnectMongoDb();
}

export { saveData, clearDb };
