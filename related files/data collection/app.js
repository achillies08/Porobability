const express = require("express");
const RiotRequest = require("riot-lol-api");
const app = express();

apiKey = "RGAPI-7a50b63b-32f8-410a-b659-6a49ac0d2351";

var riotRequest = new RiotRequest(apiKey);

summName = "achilles08";
serverName = "euw";
platformName = riotRequest.getPlatformFromRegion(serverName);
// console.log(platformName);
regionName = riotRequest.getClusterFromRegion(serverName);
// console.log(regionName);
// let puuid = "CZjifsRFkmyc-c4bTS8RPb2tRzz7LOtHNH5X-ChpbzUEXVJYNXVygTWyMUoG35Ob31cp11lZgFcEeg";

// let matchId = "EUW1_5992229412";

// Summoner-V4

// https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/achilles08?api_key=RGAPI-155b2332-df01-4b86-9c2a-45180533f5ff

summV4 = [
  platformName,
  "summoner",
  "/lol/summoner/v4/summoners/by-name/" + summName,
];

riotRequest.request(summV4[0], summV4[1], summV4[2], function (err, data) {
  console.log("Account Data: ", data);
});


// https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/bYKMm4XMV7oJlPw1ciFSirFmGUlOfL4C78a4x836NAUwwBqV?api_key=RGAPI-7a50b63b-32f8-410a-b659-6a49ac0d2351

champV4 = [  platformName,
  "summoner",
  "/lol/summoner/v4/summoners/by-name/" + summName,]
// https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/CZjifsRFkmyc-c4bTS8RPb2tRzz7LOtHNH5X-ChpbzUEXVJYNXVygTWyMUoG35Ob31cp11lZgFcEeg/ids?start=0&count=100&api_key=RGAPI-155b2332-df01-4b86-9c2a-45180533f5ff

matchV5Id = [
  regionName,
  "puuid",
  "/lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count=100",
];

riotRequest.request(
  matchV5Id[0],
  matchV5Id[1],
  matchV5Id[2],
  function (err, data) {
    accId = data;
    console.log("Match IDs: ", accId);
    puuid = accId.puuid;
  }
);

// https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_5938536778?api_key=RGAPI-155b2332-df01-4b86-9c2a-45180533f5ff

matchV5Sum = [regionName, "match", "/lol/match/v5/matches/" + matchId];

riotRequest.request(
  matchV5Sum[0],
  matchV5Sum[1],
  matchV5Sum[2],
  function (err, data) {
    accId = data;
    console.log("Match Data: ", accId);
  }
);

// https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_5938536778/timeline?api_key=RGAPI-155b2332-df01-4b86-9c2a-45180533f5ff

riotRequest.request(
  matchV5Timeline[0],
  matchV5Timeline[1],
  matchV5Timeline[2],
  function (err, data) {
    accId = data;
    console.log("Match Timeline: ", accId);
  }
);

app.listen(3000, function (err) {
  if (!err) {
    console.log("Server running on port 3000");
  } else {
    console.log(err);
  }
});