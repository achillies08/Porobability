import RiotRequest from "riot-lol-api";
import dotenv from "dotenv";

dotenv.config();

const riotRequest = new RiotRequest(process.env.APIKEY);

export default riotRequest;
