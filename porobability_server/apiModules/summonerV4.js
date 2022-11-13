import riotRequest from "../requestSetup.js";

async function summoner(summonerName, platformName) {
  return new Promise((resolve) => {
    let encName = encodeURI(summonerName)
    riotRequest.request(platformName,"summoner","/lol/summoner/v4/summoners/by-name/"+ encName,function (err, data) {
      if (!err) {
        let apiData = data;
        resolve(apiData);
      } else {
        let apiData = err.statusCode;
        resolve(apiData)
      }
    });
  });
}

export default summoner;
