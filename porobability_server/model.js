import * as tf from "@tensorflow/tfjs";
import dotenv from "dotenv";

dotenv.config()
async function predict(ar) {
  const model = await tf.loadLayersModel(
    "http://localhost:5000/model/model.json"
  );
  ar = tf.tensor(ar, [1, ar.length]);
  let prediction = await model.predict(ar).data();
  return prediction;
}

export default predict;
