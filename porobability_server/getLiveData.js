// get data from Match-V5 and process it:

import getMatchData from "./apiModules/matchV5";

let liveData = "";

async function getLiveData(regionName, puuid) {
    liveData = await getMatchData(regionName, puuid)
}

export default getLiveData;
