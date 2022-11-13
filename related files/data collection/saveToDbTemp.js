const mongoose = require("mongoose");
const { Accountdata } = require("./dbSchemaTemp");
const { Matchdata } = require("./dbSchemaTemp");

// Save account data:
let saveAccountData = async function (summName, summData, champs, matchIds) {
  var query = summName;
  Accountdata.findOne({ title: query }).then(function (err, matchdata) {
    if (err) {
      console.log("💾 Account data already exists for summoner: ", query);
    } else {
      const matchdata = new Accountdata({
        title: summName,
        accountData: summData,
        champData: champs,
        matchIDData: matchIds,
      });
      matchdata.save(function (err, matchdata) {
        if (err) {
          console.error("💾 Error saving account data: ", err);
        } else {
          console.log(
            "💾 New account data added successfully for summoner: ",
            summName
          );
        }
      });
    }
  });

  // Accountdata.updateOne(
  //   { title: query },
  //   {
  //     $set: { accountData: summData, champData: champs, matchIDData: matchIds },
  //   },
  //   { upsert: true },
  //   function (err, docs) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("💾 Account data updated successfully for: ", query);
  //     }
  //   }
  // );

  // const summdata = new Accountdata({
  //   title: summName,
  //   accountData: summData,
  //   champData: champs,
  //   matchIDData: matchIds,
  // });
  // summdata.save(function (err, matchdata) {
  //   if (err) {
  //     console.error("💾 Error saving account data: ", err);
  //   } else {
  //     console.log("💾 New summoner data added successfully for summoner: ",summName);
  //   }
  // });
};

// Save match data:,
const saveMatchData = async function (matchSummary, matchTimeline) {
  var matchQuery = matchSummary.metadata.matchId;
  Matchdata.findOne({ title: matchQuery }).then(function (err, matchdata) {
    if (err) {
      console.log("💾 Match data already exists for match ID: ", matchQuery);
    } else {
      const matchdata = new Matchdata({
        title: matchQuery,
        matchSummaryData: matchSummary,
        matchTimelineData: matchTimeline,
      });
      matchdata.save(function (err, matchdata) {
        if (err) {
          console.error("💾 Error saving match data: ", err);
        } else {
          console.log(
            "💾 New match data added successfully for match ID: ",
            matchQuery
          );
        }
      });
    }
  });
};

module.exports = { saveAccountData, saveMatchData };
