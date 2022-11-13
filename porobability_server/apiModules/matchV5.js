import riotRequest from "../requestSetup.js";

async function getMatchIds(region,puuid){
    return new Promise((resolve) => {
        riotRequest.request(region,"puuid","/lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count=9", function (err, data) {
          if (!err) {
            let apiData = data;
            resolve(apiData);
          } else {
            let apiData = err.statusCode;
            resolve(apiData);
          }
        });
      });
}

async function getMatchSummary(region,matchId){
  return new Promise((resolve) => {
    riotRequest.request(region,"match","/lol/match/v5/matches/" + matchId, function (err, data) {
      if (!err) {
        let apiData = data;
        resolve(apiData);
      } else {
        let apiData = err.statusCode;
        resolve(apiData);
      }
    });
  });
}

export {getMatchIds, getMatchSummary} ;