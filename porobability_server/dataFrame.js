import MatchData from "./dbSchema.js";

const keepArray = [
  "assists",
  "baronKills",
  "basicPings",
  "bountyLevel",
  "challenges.abilityUses",
  "challenges.bountyGold",
  "challenges.controlWardsPlaced",
  "challenges.damagePerMinute",
  "challenges.damageTakenOnTeamPercentage",
  "challenges.deathsByEnemyChamps",
  "challenges.dragonTakedowns",
  "challenges.earlyLaningPhaseGoldExpAdvantage",
  "challenges.effectiveHealAndShielding",
  "challenges.enemyChampionImmobilizations",
  "challenges.fullTeamTakedown",
  "challenges.gameLength",
  "challenges.goldPerMinute",
  "challenges.jungleCsBefore10Minutes",
  "challenges.kTurretsDestroyedBeforePlatesFall",
  "challenges.kda",
  "challenges.killParticipation",
  "challenges.laneMinionsFirst10Minutes",
  "challenges.laningPhaseGoldExpAdvantage",
  "challenges.legendaryCount",
  "challenges.maxCsAdvantageOnLaneOpponent",
  "challenges.maxKillDeficit",
  "challenges.maxLevelLeadLaneOpponent",
  "challenges.multikills",
  "challenges.mythicItemUsed",
  "challenges.riftHeraldTakedowns",
  "challenges.skillshotsDodged",
  "challenges.skillshotsHit",
  "challenges.soloKills",
  "challenges.soloTurretsLategame",
  "challenges.stealthWardsPlaced",
  "challenges.takedowns",
  "challenges.takedownsBeforeJungleMinionSpawn",
  "challenges.teamDamagePercentage",
  "challenges.teamElderDragonKills",
  "challenges.teamRiftHeraldKills",
  "challenges.turretPlatesTaken",
  "challenges.turretTakedowns",
  "challenges.visionScoreAdvantageLaneOpponent",
  "challenges.visionScorePerMinute",
  "challenges.wardTakedowns",
  "champExperience",
  "champLevel",
  "championId",
  "consumablesPurchased",
  "damageDealtToBuildings",
  "damageDealtToObjectives",
  "damageDealtToTurrets",
  "damageSelfMitigated",
  "deaths",
  "detectorWardsPlaced",
  "doubleKills",
  "dragonKills",
  "goldEarned",
  "goldSpent",
  "inhibitorKills",
  "inhibitorTakedowns",
  "inhibitorsLost",
  "item0",
  "item1",
  "item2",
  "item3",
  "item4",
  "item5",
  "item6",
  "itemsPurchased",
  "killingSprees",
  "kills",
  "largestCriticalStrike",
  "largestKillingSpree",
  "largestMultiKill",
  "longestTimeSpentLiving",
  "magicDamageDealt",
  "magicDamageDealtToChampions",
  "magicDamageTaken",
  "neutralMinionsKilled",
  "objectivesStolen",
  "objectivesStolenAssists",
  "pentaKills",
  "physicalDamageDealt",
  "physicalDamageDealtToChampions",
  "physicalDamageTaken",
  "quadraKills",
  "spell1Casts",
  "spell2Casts",
  "spell3Casts",
  "spell4Casts",
  "summoner1Casts",
  "summoner1Id",
  "summoner2Casts",
  "summoner2Id",
  "summonerLevel",
  "timeCCingOthers",
  "timePlayed",
  "totalDamageDealt",
  "totalDamageDealtToChampions",
  "totalDamageShieldedOnTeammates",
  "totalDamageTaken",
  "totalHeal",
  "totalHealsOnTeammates",
  "totalMinionsKilled",
  "totalTimeCCDealt",
  "totalTimeSpentDead",
  "totalUnitsHealed",
  "tripleKills",
  "trueDamageDealt",
  "trueDamageDealtToChampions",
  "trueDamageTaken",
  "turretKills",
  "turretTakedowns",
  "turretsLost",
  "visionScore",
  "visionWardsBoughtInGame",
  "wardsKilled",
  "wardsPlaced",
];

let dataframe = [];
let completeDoc = [];
let arrayDoc = [];

async function createDataframe(summoners) {
  await getData(summoners);

  for (let i in completeDoc) {
    let temp = [];
    for (let j in completeDoc[i]) {
      temp.push(
        getArr(keepArray, flattenJSON(completeDoc[i][j].matchSummary[0]))
      );
      // console.log(completeDoc[i][j].matchSummary[0].summonerName);
    }
    arrayDoc.push(temp);
  }

  var avgArr = [];

  for (let a in arrayDoc) {
    let sumArr = new Array(keepArray.length).fill(0);
    for (let s in arrayDoc[a]) {
      for (let e in arrayDoc[a][s]) {
        sumArr[e] = sumArr[e] + arrayDoc[a][s][e];
      }
    }
    avgArr.push(sumArr);
  }

  for (let x in avgArr) {
    for (let a in avgArr[x]) {
      avgArr[x][a] = avgArr[x][a] ? avgArr[x][a] : 0;
    }
  }

  for (let a in avgArr) {
    let n = arrayDoc[a].length;
    for (let e in avgArr[a]) {
      avgArr[a][e] = avgArr[a][e] / n;
    }
  }

  dataframe = avgArr.flat();
  return dataframe;
}

// Functions :

//  Get data from Atlas:

async function getData(list) {

  for (let n in list) {
    const findQuery = {
      $and: [
        { "matchSummary.info.participants.summonerName": list[n] },
        { "matchSummary.info.gameMode": "CLASSIC" },
        { "matchSummary.metadata.participants": { $size: 10 } },
      ],
    };

    const projectQuery = {
      _id: 0,
      matchSummary: {
        $filter: {
          input: "$matchSummary.info.participants",
          as: "m",
          cond: {
            $and: [
              {
                $eq: ["$$m.summonerName", list[n]],
              },
            ],
          },
        },
      },
    };
    let doc = await MatchData.find(findQuery, projectQuery).lean();
    // console.log(doc);
    completeDoc.push(doc);
  }
}

function flattenJSON(obj = {}, res = {}, extraKey = "") {
  for (let key in obj) {
    if (typeof obj[key] !== "object") {
      res[extraKey + key] = obj[key];
    } else {
      flattenJSON(obj[key], res, `${extraKey}${key}.`);
    }
  }
  return res;
}

function getArr(arr, obj) {
  let outArr = [];
  for (var k in arr) {
    var key = arr[k];
    outArr.push(`${obj[key]}`);
  }
  outArr = outArr.map(Number);
  return outArr;
}

async function flushDataframe() {
  dataframe.length = 0;
  completeDoc.length = 0;
  arrayDoc.length = 0;
}

export { createDataframe, flushDataframe };
