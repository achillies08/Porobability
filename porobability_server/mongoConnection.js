import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectMongoDb() {
  await mongoose
    .connect(process.env.MONGOURL)
    .then(console.log("Connected to MongoDB Atlas."))
    .catch((err) => console.error(err.message));
}

async function disconnectMongoDb() {
  await mongoose
    .disconnect()
    .then(console.log("Disconnected from MongoDB Atlas."))
    .catch((err) => console.error(err.message));
}

export { connectMongoDb, disconnectMongoDb };
