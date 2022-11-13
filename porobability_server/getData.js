// Called by express app
import spectate from "./apiModules/spectatorV4.js";
import riotRequest from "./requestSetup.js";
import summoner from "./apiModules/summonerV4.js";
import { puuidFunc, flushGetPuuids } from "./getPuuids.js";
import { createDataframe, flushDataframe } from "./dataFrame.js";
import { handleErr } from ".//handleErrorCodes.js";
import ddFunc from "./apiModules/dDragon.js";
import predict from "./model.js";
// import getLiveData from "./getLiveData.js";

let summonerData = "";
let spectatorData = "";

async function getData(summonerName, serverName) {
  let platformName = riotRequest.getPlatformFromRegion(serverName);
  let regionName = riotRequest.getClusterFromRegion(serverName);
  summonerData = await summoner(summonerName, platformName);
  if (typeof summonerData === "object") {
    console.log("Summoner Exists.");
    console.log(summonerData);
    spectatorData = await spectate(summonerData.id, platformName);
    if (typeof spectatorData === "object") {
      console.log("Summoner is Live! ");
      let [matches, names] = await puuidFunc(spectatorData,platformName,regionName);
      console.log("Found ",matches.length," matches ","for ",names.length," summoners");
      let dataframe = await createDataframe(names);
      console.log("Dataframe created: ");
      console.dir(dataframe, { maxArrayLength: null });
      let prediction = await predict(dataframe);
      let participants = await ddFunc(spectatorData);
      console.log("datadragon object created: ");
      console.log("Participants: ", participants);
      await flushGetPuuids();
      await flushDataframe();
      // return participants;
      return [participants, prediction];
    } else {
      // Error:
      console.log("Summoner is not live!");
      console.log("Spectator-V4 error code: ", spectatorData);
      let dataToSend = handleErr(spectatorData);
      return dataToSend;
    }
  } else {
    // Error:
    console.log("Summoner-V4 error code: ", summonerData);
    let dataToSend = handleErr(summonerData);
    return dataToSend;
  }
}

// getData("2025 enjoyer", "euw");

export default getData;
