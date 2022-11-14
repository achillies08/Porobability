import mongoose from "mongoose";

const Schema = mongoose.Schema;

let matchSchema = new Schema({
  matchSummary: Object,
});

const MatchData = mongoose.model("Matchdata", matchSchema);

export default MatchData;
