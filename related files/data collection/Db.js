const express = require("express");
const mongoose = require("mongoose");
const AccountTestData = require('.\dbSchema.js');
const MatchTestData = require(".\dbSchema.js");
const RiotRequest = require("riot-lol-api");
const app = express();


apiKey = "RGAPI-54f7ad30-e3e2-44c6-a78f-3b30c5e4a95e";

var riotRequest = new RiotRequest(apiKey);

summName = "devaa";
serverName = "euw";
platformName = riotRequest.getPlatformFromRegion(serverName);
regionName = riotRequest.getClusterFromRegion(serverName);
matchV5Sum = [];
matchV5Timeline = [];

// Mongodb connect:

async function conn(){
  mongoose
  .connect("mongodb://localhost:27017/riotGamesdb")
  .then(() => console.log("💻 Mongodb Connected"))
  .catch((err) => console.error("Connecting error: ",err));
};

// MongoDb disconnect:

async function diconn(){
  mongoose
  .disconnect("mongodb://localhost:27017/riotGamesdb")
  .then(() => console.log("💻 Mongodb Disconnected"))
  .catch((err) => console.error("Disconection error: ",err));
};

// callApiFunction
function callApi(endPt) {
  return new Promise((resolve) => {
    riotRequest.request(endPt[0], endPt[1], endPt[2], function (err, data) {
      if (!err) {
        apiData = data;
        resolve(apiData);
      } else {
        console.error("Error aayi hai: ", err);
      }
    });
  });
}

async function getData() {
  try {
    await conn()
    // Summoner=V4:
    summV4 = [platformName,"summoner","/lol/summoner/v4/summoners/by-name/" + summName,];
    summData = await callApi(summV4);
    console.log("Account Info: ", summData);
    puuid = summData.puuid;
    summId = summData.id;
    // Champion-V4:
    champV4 = [platformName,"id","/lol/champion-mastery/v4/champion-masteries/by-summoner/" + summId,];
    champs = await callApi(champV4)
    console.log("Champion Mastery: ",champs);
    // Match-V5 for match IDs:
    matchV5Id = [regionName,"puuid","/lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count=100",];
    matchIds = await callApi(matchV5Id);
    console.log("Match ID: ", matchIds[0], typeof matchIds[0]);
    matchId = matchIds[0];

    matchV5Sum = [regionName, "match", "/lol/match/v5/matches/" + matchId];
    matchSummary = await callApi(matchV5Sum);
    console.log("Match Summary: ", matchSummary);

    matchV5Timeline = [regionName,"match","/lol/match/v5/matches/" + matchId + "/timeline",];
    matchTimeline = await callApi(matchV5Timeline);
    console.log("Match Timeline: ", matchTimeline);
    await diconn();
    // Fetch Data
  } catch (error) {
    console.log("error: ", error);
  }
}

getData();


// Save Data function:

// async function saveData(summName,summData,matchIds,matchSummary,matchTimeline) {
 
//   const AccountTestData = mongoose.model("AccountTestData", summonerSchema);
//   const MatchTestData = mongoose.model("MatchTestData", matchSchema);
//   var query = summName;
//   AccountTestData.findOne({ title: query })
//   .then (function (err, accountData) {
//     if (err) console.log(err);
//     if (accountData) {
//       AccountTestData.replaceOne(
//         { title: summName },
        
//           { accountData: summData },
//           { champData: champs }
//         function (err, docs) {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log("Account data updated successfully.");
//           }
//         }
//       );
//       AccountTestData.updateOne(
//         { title: summName },
//         { $push: { matchIDData: matchIds } },
//         async function (err, success) {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log("Match IDs added successfully.");
//           }
//         }
//       );
//       console.log("Account data updated.");
//     } else {
//       const summdata = new AccountTestData({
//         title: summName,
//         accountData: summData,
//         // champData:champs,
//         matchIDData: matchIds,
//       });
//       summdata.save(function (err, success) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log("New account information saved succesfully.");
//         }
//       });
//     }
//   });

//   // const AccountTestData = mongoose.model("AccountTestData",summonerSchema);
//   // const summdata = new AccountTestData({
//   //   title: summName,
//   //   accountData: summData,
//   //   // champData:champs,
//   //   matchIDData: matchIds,
//   // });
//   // await summdata.save()

//   // Save Match Data:

//   var matchQuery = matchSummary.metadata.matchId;
//    MatchTestData.findOne({ title: matchQuery })
//    .then (function (err, matchdata) {
//     if (err) console.log(err);
//     if (matchdata) {
//       console.log("Match data already exists.");
//     } else {
//       const matchdata = new MatchTestData({
//         title: matchSummary.metadata.matchId,
//         matchSummaryData: matchSummary,
//         matchTimelineData: matchTimeline,
//       });
//       matchdata.save(function (err, matchdata) {
//         if (err) console.log(err);
//         console.log("New match data added successfully.");
//       });
//     }
//   });

//   // const MatchTestData = mongoose.model("MatchTestData",matchSchema);
//   // const matchdata = new MatchTestData({
//   //   title:matchSummary.metadata.matchId,
//   //   matchSummaryData:matchSummary,
//   //   matchTimelineData:matchTimeline
//   // })
//   // await matchdata.save()

// for await (const doc of AccountTestData.find()) {
//     fetchData = doc; // Prints documents one at a time
//     console.log("Puuid: ", fetchData.accountData.puuid);
//   }
// }
