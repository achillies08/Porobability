// Returns JSON object
import getData from "./getData.js";
import { errMessage } from "./handleErrorCodes.js";
import { clearDb } from "./dbOperations.js";
import { connectMongoDb } from "./mongoConnection.js";

async function sendData(summonerName, serverName) {
  await connectMongoDb();

  let finalObj = {};
  let [participants, prediction] = await getData(summonerName, serverName);
  console.log("SD:", participants, prediction);
  if (!errMessage) {
    // Join DataDragon and Model output:
    finalObj = {
      participants,
      prediction,
    };
    // console.log("SD: ", finalObj);
    await clearDb();
    return finalObj;
  } else {
    finalObj = {
      errMessage,
    };
    await clearDb();
    return finalObj;
  }
}

export default sendData;
