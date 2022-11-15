import "./App.css";
import InputField from "./inputbox";
import { Pass, Fail } from "./cards";
import renderContext from "./contexts/renderContext";
import { useState } from "react";
import Loader from "./loader";
import backJinx from "./resources/backJinx.jpg";
import backSenna from "./resources/backSenna.jpg";
import { Card } from "@mui/material";

function App() {
  const [participants, setParticipants] = useState([]);
  const [errMsg, setErrMsg] = useState([]);
  const [err, setErr] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [showLoader, setshowLoader] = useState(false);
  const [disable, setDisable] = useState(false);
  const val = {
    participants,
    setParticipants,
    showCard,
    setShowCard,
    prediction,
    setPrediction,
    showLoader,
    setshowLoader,
    disable,
    setDisable,
    errMsg,
    setErrMsg,
    err,
    setErr,
  };
  const styles = {
    appStyle: {
      backgroundImage: `url(${showCard? backSenna:backJinx})`,
      backgroundSize: "100%",
      objectFit: "fill",
      height:"100vh"
    },
  };
  return (
    <Card style={styles.appStyle}>
      <>
        <renderContext.Provider value={val}>
          {showCard ? (
            <>
              <InputField />
              {err ? <Fail /> : <Pass />}
            </>
          ) : showLoader ? (
            <>
              <InputField />
              <Loader />
            </>
          ) : (
            <InputField />
          )}
        </renderContext.Provider>
      </>
    </Card>
  );
}

export default App;
