import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Stack } from "@mui/system";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import renderContext from "./contexts/renderContext";

const InputField = () => {
  const [server, setServer] = React.useState("");
  const handleChange = (event) => {
    setServer(event.target.value);
  };

  const [summoner, setSummonerName] = React.useState("");
  const handleSummonerChange = (event) => {
    setSummonerName(event.target.value);
  };

  const {
    setShowCard,
    setParticipants,
    prediction,
    participants,
    setPrediction,
    setshowLoader,
    disable,
    setDisable,
    setErrMsg,
    setErr,
  } = React.useContext(renderContext);

  const handleSubmit = () => {
    if (summoner === "" || server === "") {
      alert("Enter complete info!!");
    } else {
      let postData = {
        summonerName: summoner,
        serverName: server,
      };
      console.log(postData);
      
      axios
        .post("https://porobabilityserver.herokuapp.com/", postData)
        .then(setshowLoader(true), setDisable(true), setShowCard(false))
        .then((res) => {
          setShowCard(true);
          console.log(res.data);
          if (res.data.participants) {
            console.log("Participants exist.");
            setErr(false);
            setParticipants(res.data.participants);
            setPrediction(res.data.prediction);
            console.log(prediction);
            console.log(participants);
            setshowLoader(false);
          } else {
            console.log("Error Aayi hai.");
            setshowLoader(false);
            setErr(true);
            setErrMsg(res.data.errMessage);
          }

          setDisable(false);
        })
        .catch((err) => console.error(err));
    }
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      handleSubmit();
    }
  };

  return (
    <div className="inputField">
      <Box
        p={2}
        sx={{
          marginTop: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper elevation={2}>
          <Stack direction="row" spacing={2} alignItems="center" p={1}>
            <div>
              <FormControl required={true} sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Server
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={server}
                  label="Server"
                  onChange={handleChange}
                  disabled={disable}
                >
                  <MenuItem value={"br"}>Brazil</MenuItem>
                  <MenuItem value={"eune"}>Europe Nordic & East</MenuItem>
                  <MenuItem value={"euw"}>Europe West</MenuItem>
                  <MenuItem value={"jp"}>Japan</MenuItem>
                  <MenuItem value={"kr"}>Korea</MenuItem>
                  <MenuItem value={"lan"}>Latin America North</MenuItem>
                  <MenuItem value={"las"}>Latin America South</MenuItem>
                  <MenuItem value={"na"}>North America</MenuItem>
                  <MenuItem value={"oce"}>Oceania</MenuItem>
                  <MenuItem value={"ru"}>Russia</MenuItem>
                  <MenuItem value={"tr"}>Turkey</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div>
              <TextField
                required={true}
                autoFocus={true}
                id="outlined-textarea"
                label="Summoner Name"
                placeholder={summoner}
                onChange={handleSummonerChange}
                size="medium"
                onKeyDown={onEnterPress}
                sx={{ width: 500 }}
                disabled={disable}
              />
            </div>

            <div>
              <Button
                variant="contained"
                disabled={disable}
                onClick={handleSubmit}
              >
                Go
              </Button>
            </div>
          </Stack>
        </Paper>
      </Box>
    </div>
  );
};

export default InputField;
