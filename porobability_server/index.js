import express from "express";
import bodyParser from "body-parser";
import sendData from "./sendData.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.options("*", cors());

app.use(cors({ origin: true }));


app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use("/model", express.static(__dirname + "/tfModel"));

app.listen(PORT, () => `Server running on port ${PORT} 🔥`);

app.post("/", async (req, res) => {
  const summonerName = req.body.summonerName;
  const serverName = req.body.serverName;
  console.log("Data recieved: ", summonerName, " ", serverName);
  res.status(200).json(await sendData(summonerName, serverName));
});
