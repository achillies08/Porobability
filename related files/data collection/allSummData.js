const RiotRequest = require("riot-lol-api");
const mongoose = require("mongoose");
const saveToDb = require("./saveToDbTemp");
const { Accountdata } = require("./dbSchemaTemp");
const { Matchdata } = require("./dbSchemaTemp");

apiKey = "RGAPI-e750db9a-265f-4f1d-81ec-09b2009947ec";

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
        handleError(i, uniquePuuidsM);
      }
    });
  });
}

// Mongodb connect:
async function conn() {
  mongoose
    .connect("mongodb://localhost:27017/riotGamesOlddb")
    .then(() => console.log("💾 Mongodb Connected"))
    .catch((err) => console.error("Connecting error: ", err));
}

// MongoDb disconnect:
async function disconn() {
  mongoose
    .disconnect("mongodb://localhost:27017/riotGamesOlddb")
    .then(() => console.log("💾 Mongodb Disconnected"))
    .catch((err) => console.error("Disconection error: ", err));
}

let puuidsA = [];
let puuidsM = [];
let matchIdArray = [];
let uniquePuuidsM = [];
let uniqueMatchIds = [];
let i = 0;
let x = 0;

//  moreData():
async function moreData() {
  try {
    await conn();

    // get puuids from Matchdataata:
    for await (const doc of Matchdata.find()) {
      puuidsM.push(doc.matchSummaryData.metadata.participants);
      console.log(".")
    }
    // Get unique puuids:
    puuidsM = puuidsM.toString().split(",");
    puuidsM.forEach((c) => {
      if (!uniquePuuidsM.includes(c)) {
        uniquePuuidsM.push(c);
      }
    });
    
    // get puuids from Accountdata:
    for await (const doc of Accountdata.find()) {
      puuidsA.push(doc.accountData.puuid);
      console.log("/");
    }

    console.log("PuuidA: ",puuidsA.length,"PuuidM: ",uniquePuuidsM.length);

    uniquePuuidsM = uniquePuuidsM.filter((val)=>{
      return !puuidsA.find((a)=>{
        return val == a
      })
    });

    console.log("New uniquePuuidsM: ",uniquePuuidsM.length);

    // console.log(uniquePuuidsM);

    for (i = uniquePuuidsM.length; i >= 0; i--) {
      console.log("i: ", i);
      let uniquePuuid = uniquePuuidsM[i - 1];

      // Summoner-V4:
      puuidUrl = [platformName,"puuid","/lol/summoner/v4/summoners/by-puuid/" + uniquePuuid,];
      summData = await callApi(puuidUrl);
      summId = summData.id;

      // Champ-V4:
      champV4 = [platformName,"id","/lol/champion-mastery/v4/champion-masteries/by-summoner/" + summId,];
      champs = await callApi(champV4);

      // Match-V5 for Match IDs:
      matchV5Id = [regionName,"puuid","/lol/match/v5/matches/by-puuid/" +uniquePuuid +"/ids?start=0&count=100",];
      matchIds = await callApi(matchV5Id);

      // Save Data to Db:
      await saveToDb.saveAccountData(summData.name, summData, champs, matchIds);

      await uniquePuuidsM.pop();
    }

    await disconn();
  } catch (err) {
    console.error("⚠️", err);
  }
}

moreData();

// handleError():
async function handleError(i, uniquePuuidsM) {
  console.log("Running error function.");
  console.log("i: ", i, "x: ", x);

  if (!uniquePuuidsM.length == 0) {
    for (i = uniquePuuidsM.length; i > 0; i--) {
      console.log("ei: ", i);
      let uniquePuuid = uniquePuuidsM[i - 1];
      // Summoner-V4:
      puuidUrl = [platformName,"puuid","/lol/summoner/v4/summoners/by-puuid/" + uniquePuuid,];
      summData = await callApi(puuidUrl);
      summId = summData.id;

      // Champ-V4:
      champV4 = [platformName,"id","/lol/champion-mastery/v4/champion-masteries/by-summoner/" + summId,];
      champs = await callApi(champV4);

      // Match-V5 for Match IDs:
      matchV5Id = [regionName,"puuid","/lol/match/v5/matches/by-puuid/" +uniquePuuid +"/ids?start=0&count=100",];
      matchIds = await callApi(matchV5Id);

      // Save Data to Db:
      await saveToDb.saveAccountData(summData.name, summData, champs, matchIds);

      await uniquePuuidsM.pop();
    }

  }
}
