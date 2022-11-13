const RiotRequest = require("riot-lol-api");
const mongoose = require("mongoose");
const saveToDb = require("./saveToDb");
const { AccountTestData } = require("./dbSchema");
const { MatchTestData } = require("./dbSchema");

apiKey = "RGAPI-159d4bc4-4fc4-4b38-9114-893b3f0b563f";

var riotRequest = new RiotRequest(apiKey);

serverName = "euw";
platformName = riotRequest.getPlatformFromRegion(serverName);
regionName = riotRequest.getClusterFromRegion(serverName);

// callApiFunction:
function callApi(endPt) {
  return new Promise((resolve) => {
    riotRequest.request(endPt[0], endPt[1], endPt[2], function (err, data) {
      if (!err) {
        apiData = data;
        resolve(apiData);
      } else {
        console.error("😵 Error calling callApi: ", err);
        
      }
    });
  });
}

// Mongodb connect:
async function conn() {
  mongoose
    .connect("mongodb://localhost:27017/riotGamesdb")
    .then(() => console.log("💾 Mongodb Connected"))
    .catch((err) => console.error("Connecting error: ", err));
}

// MongoDb disconnect:
async function disconn() {
  mongoose
    .disconnect("mongodb://localhost:27017/riotGamesdb")
    .then(() => console.log("💾 Mongodb Disconnected"))
    .catch((err) => console.error("Disconection error: ", err));
}

let puuids = [];
let matchIdArray = [];
let uniquePuuids = [];
let uniqueMatchIds = [];

async function moreData() {
  try {
    await conn();

    // get puuids from db:
    for await (const doc of MatchTestData.find()) {
      puuids.push(doc.matchSummaryData.metadata.participants);
    }

    // Get unique puuids:
    puuids = puuids.toString().split(",");
    puuids.forEach((c) => {
      if (!uniquePuuids.includes(c)) {
        uniquePuuids.push(c);
      }
    });

    // console.log(uniquePuuids);

    for (i = 0; i < uniquePuuids.length; i++) {
      console.log(i);

      // Summoner-V4:
       puuidUrl = [platformName,"puuid","/lol/summoner/v4/summoners/by-puuid/" + uniquePuuids[i],];
       summData = await callApi(puuidUrl);
       summId = summData.id;

      // Champ-V4:
       champV4 = [platformName,"id","/lol/champion-mastery/v4/champion-masteries/by-summoner/" + summId,];
       champs = await callApi(champV4);

      // Match-V5 for Match IDs:
       matchV5Id = [regionName,"puuid","/lol/match/v5/matches/by-puuid/"+uniquePuuids[i] +"/ids?start=0&=100",];
       matchIds = await callApi(matchV5Id);

      // Save Data to Db:
      await saveToDb.saveAccountData(summData.name, summData, champs, matchIds);

      // Get match ID array:
      for (n = 0; n < matchIds.length; n++) {
        // console.log(matchIds);
        matchIdArray.push(matchIds[n]);
      }
      // Remove duplicates:
      matchIdArray.forEach((m) => {
        if (!uniqueMatchIds.includes(m)) {
          uniqueMatchIds.push(m);
        }
      });
    }

    // console.log(uniqueMatchIds);
    for (x = 0; x < uniqueMatchIds.length; x++) {
      console.log(x);
      // Match-V5 for Match Summary:
       matchV5Sum = [regionName,"match","/lol/match/v5/matches/" + uniqueMatchIds[x],];
       matchSummary = await callApi(matchV5Sum);
      // console.log("Summary Data: ", matchSummary.metadata.matchId);

      // Match-V5 for Match Timeline:
       matchV5Timeline = [regionName,"match","/lol/match/v5/matches/" + uniqueMatchIds[x] + "/timeline",];
       matchTimeline = await callApi(matchV5Timeline);
      // console.log("Timeline Data: ", matchV5Timeline);

      // Save match data to DB:
      await saveToDb.saveMatchData(matchSummary, matchTimeline);
    }

    console.log(uniqueMatchIds);

    await disconn();
  } catch (err) {
    console.error("⚠️", err);
  }
}

moreData();
