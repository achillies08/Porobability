const express = require("express");
const RiotRequest = require("riot-lol-api");
const mongoose = require("mongoose");
const saveToDb = require("./saveToDb");
const app = express();

apiKey = "RGAPI-1348ba6e-9f4c-4364-b64f-1b322d0c4ff7";

var riotRequest = new RiotRequest(apiKey);

summName = "achilles08";
serverName = "euw";
platformName = riotRequest.getPlatformFromRegion(serverName);
// console.log(platformName);
regionName = riotRequest.getClusterFromRegion(serverName);
// console.log(regionName);

// const matchV5Sum  = {};
// const matchSummary = {};
// const matchV5Timeline = {};
// const matchTimeline = {};

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
};

// Mongodb connect:
async function conn() {
  mongoose
    .connect("mongodb://localhost:27017/riotGamesdb")
    .then(() => console.log("💾 Mongodb Connected"))
    .catch((err) => console.error("Connecting error: ", err));
};

// MongoDb disconnect:
async function disconn() {
  mongoose
    .disconnect("mongodb://localhost:27017/riotGamesdb")
    .then(() => console.log("💾 Mongodb Disconnected"))
    .catch((err) => console.error("Disconection error: ", err));
};

// Get Data Function:
async function getData() {

  try {

    await conn()
    
    // Summoner=V4:
    summV4 = [platformName,"summoner","/lol/summoner/v4/summoners/by-name/" + summName,];
    summData = await callApi(summV4);
    // console.log("Account Info: ", summData);
    puuid = summData.puuid;
    summId = summData.id;

    // Champion-V4:
    champV4 = [platformName,"id","/lol/champion-mastery/v4/champion-masteries/by-summoner/" + summId,];
    champs = await callApi(champV4);
    // console.log("Champion Mastery: ", champs);

    // Match-V5 for Match IDs:
    matchV5Id = [regionName,"puuid","/lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count=100",];
    matchIds = await callApi(matchV5Id);
    // console.log("Match IDs: ", matchIds.length, "Type: ", typeof matchIds);
    
    // Save account data to DB:
    await saveToDb.saveAccountData(summName, summData, champs, matchIds);

    // For loop here:
    for (i=0;i<matchIds.length;i++){
      // Batch Number:
      console.log(i);
      // Match-V5 for Match Summary:
      const matchV5Sum = ([regionName,"match","/lol/match/v5/matches/" + matchIds[i],]);
      const matchSummary = await callApi(matchV5Sum);
      // console.log("Summary Data: ", matchSummary.metadata.matchId);

      // Match-V5 for Match Timeline:
      const matchV5Timeline = ([regionName,"match","/lol/match/v5/matches/" + matchIds[i] + "/timeline",]);
      const matchTimeline = await callApi(matchV5Timeline);
      // console.log("Timeline Data: ", matchV5Timeline);

      // Save match data to DB:
      await saveToDb.saveMatchData(matchSummary,matchTimeline)
    };

    // Object.values(matchIds).forEach(async (matchId) => {

    //   // Match-V5 for Match Summary:
    //   const matchV5Sum = ([regionName,"match","/lol/match/v5/matches/" + matchId,]);
    //   const matchSummary = await callApi(matchV5Sum);
    //   // console.log("Summary Data: ", matchSummary);

    //   // Match-V5 for Match Timeline:
    //   const matchV5Timeline = ([regionName,"match","/lol/match/v5/matches/" + matchId + "/timeline",]);
    //   const matchTimeline = await callApi(matchV5Timeline);
    //   console.log("Timeline Data: ", matchTimeline);

    //   // Save match data to DB:
    //   await saveToDb.saveMatchData(matchSummary,matchTimeline)

    // });
    // await disconn();

  } catch (error) {
    console.log("⚠️ Error calling getData function: ", error);
  }
 
};

getData();