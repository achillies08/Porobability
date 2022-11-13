import riotRequest from "./requestSetup.js";

function callApi(endPt) {
  return new Promise((resolve) => {
    riotRequest.request(endPt[0], endPt[1], endPt[2], function (err, data) {
      if (!err) {
        let apiData = data;
        resolve(apiData);
      } else {
        
        console.error("😵 Error calling callApi: ", err);
      }
    });
  });
}

export default callApi;
