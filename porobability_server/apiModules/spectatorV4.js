import riotRequest from "../requestSetup.js";

async function spectate(summonerId, platformName) {
  return new Promise((resolve) => {
    riotRequest.request(platformName,"id","/lol/spectator/v4/active-games/by-summoner/" + summonerId,function (err, data) {
        if (!err) {
          let apiData = data;
          resolve(apiData);
        } else {
          let apiData = err.statusCode;
          resolve(apiData);
        }
      }
    );
  });
}

export default spectate;
