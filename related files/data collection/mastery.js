                                // WEB SCRAPPER:
const axios = require("axios");
const cheerio = require("cheerio");


// URL: https://championmastery.gg/summoner?summoner=achilles08&region=EUW

// Selector: $('#tbody > tr:nth-child(9) > td:nth-child(1) > a')
let masteryData = {};
let champData = {};
let Promise
async function mastery(summName,region){
  axios
  .get(
    "https://championmastery.gg/summoner?summoner=" +
      summName +
      "&region=" +
      region
  )
  .then((res) => {
    let $ = cheerio.load(res.data);
    $("#tbody > tr").each((i,champ) => {
      tableData = $(champ).find("td");
      champion = $(tableData[0]).text().trim();
      points = $(tableData[2]).text().trim();
      // console.log(i, champion,":", points);
      champData={
        champion,
        points
      };
      masteryData[i] = champData;
    });
    console.log(masteryData);
    return masteryData;
  })
  .catch((err) => console.error("Error ayi hai: ", err));
}

module.exports = mastery;
// console.log(module);

// #mainContent > div.row.summoner_champions_details_table_container > div > div > div.box.box-padding-10-5.tabs-content > div.content.active > div > table > tbody > tr:nth-child(2) > td:nth-child(3) > a > progressbar > div.progressBarTxt