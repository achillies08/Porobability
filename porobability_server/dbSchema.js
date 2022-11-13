import mongoose from "mongoose";

const Schema = mongoose.Schema;

let matchSchema = new Schema({
  title: { type: String, unique: true },
  matchSummary: Object,
});

const MatchData = mongoose.model("Matchdata", matchSchema);

export default MatchData;
