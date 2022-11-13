const mongoose = require("mongoose");

const Schema = mongoose.Schema;

summonerSchema = new Schema({
  title: { type: String,
           unique:true },
  accountData: Object,
  champData: Object,
  matchIDData: Object,
});
matchSchema = new Schema({
  title: {type:String,
          unique:true},
  matchSummaryData: Object,
  matchTimelineData: Object,
});

module.exports = {
    AccountTestData: mongoose.model('AccountTestData', summonerSchema),
    MatchTestData: mongoose.model('MatchTestData', matchSchema)
  };