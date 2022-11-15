import summoner from "./apiModules/summonerV4.js";
import { getMatchIds } from "./apiModules/matchV5.js";
import { getMatchSummary } from "./apiModules/matchV5.js";
import { saveData } from "./dbOperations.js";

let summList = [];
let puuidList = [];
let matchIdList = [];
let uniqueMatchIds = [];

// take spectator data
async function puuidFunc(data, platformName, regionName) {
  // get 10 summoner names
  summonerList(data);
  // console.log(summList);
  for (let name in summList) {
    // call summoner-V4 for the names
    
    // get 10 puuids
    puuidList.push((await summoner(summList[name], platformName)).puuid);
  }
  console.log(puuidList);
  await getAllMatchIds(regionName, puuidList);
  // console.log(summList);
  // console.log("Found ",uniqueMatchIds.length," unique Match IDs",uniqueMatchIds);
  await getAllMatchSummaries(regionName, uniqueMatchIds);
  return [uniqueMatchIds, summList];
}

function summonerList(data) {
  for (let i = 0; i < 10; i++) {
    summList.push(data.participants[i].summonerName);
  }
}

async function getAllMatchIds(region, puuids) {
  for (let id in puuids) {
    matchIdList.push(await getMatchIds(region, puuids[id]));
  }
  matchIdList = matchIdList.flat();
  getUniqueMatchIds(matchIdList);
}

function getUniqueMatchIds(matchIdList) {
  matchIdList.forEach((m) => {
    if (!uniqueMatchIds.includes(m)) {
      uniqueMatchIds.push(m);
    }
  });
}

async function getAllMatchSummaries(region, ids) {

  for (let id in ids) {
    let data = await getMatchSummary(region, ids[id]);
    await saveData(data);
    console.log(id);
  }
}

async function flushGetPuuids() {
  summList.length = 0;
  puuidList.length = 0;
  matchIdList.length = 0;
  uniqueMatchIds.length = 0;
  console.log(summList, puuidList, matchIdList, uniqueMatchIds);
}

export { puuidFunc, flushGetPuuids };
