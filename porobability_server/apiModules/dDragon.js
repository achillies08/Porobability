import axios from "axios";

const cdn = "http://ddragon.leagueoflegends.com/cdn/";

let champJson = await axios.get("https://ddragon.leagueoflegends.com/cdn/12.20.1/data/en_US/champion.json");

champJson = champJson.data.data;

let version = await axios.get("https://ddragon.leagueoflegends.com/api/versions.json")
version = version.data[0];

// console.log(version);

async function ddFunc(obj){
    let participants = await createObj(obj,version,cdn,champJson);
    return participants;
}

async function createObj(obj,version,cdn,champJson){
    let participants = [];

    for(let i = 0;i<10;i++){
        let participantObj = {
            summonerName : obj.participants[i].summonerName,
            profileIconUrl : cdn+version+"/img/profileicon/"+obj.participants[i].profileIconId+".png",
            championName : await getChampName(champJson,obj,i),
            championPic : cdn+version+"/img/champion/"+ await getChampName(champJson,obj,i)+".png",
            teamId : obj.participants[i].teamId
        }
        participants.push(participantObj)
    }
    return participants;
}

async function getChampName(champJson, obj, i) {
  for (const k in champJson) {
    if (champJson[k].key == obj.participants[i].championId) {
      let champName = champJson[k].id;
      return champName;
    }
  }
}

export default ddFunc;
