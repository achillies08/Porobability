import * as React from "react";
import List from "@mui/material/List";
import { Card, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import red from "./resources/red.png";
import blue from "./resources/blue.png";
import createListItem from "./listItem";
import renderContext from "./contexts/renderContext";
import errGif from "./resources/errGif.gif";

// const Obj = {
//   participants: [
//     {
//       summonerName: "Tapir Malajski",
//       profileIconUrl:
//         "http://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/5023.png",
//       championName: "Draven",
//       championPic:
//         "http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/Draven.png",
//       teamId: 100,
//     },
//     {
//       summonerName: "ItaChibi",
//       profileIconUrl:
//         "http://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/5141.png",
//       championName: "Tryndamere",
//       championPic:
//         "http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/Tryndamere.png",
//       teamId: 100,
//     },
//     {
//       summonerName: "CHONI",
//       profileIconUrl:
//         "http://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/4666.png",
//       championName: "Nami",
//       championPic:
//         "http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/Nami.png",
//       teamId: 100,
//     },
//     {
//       summonerName: "Useless Vladimir",
//       profileIconUrl:
//         "http://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/502.png",
//       championName: "Fiddlesticks",
//       championPic:
//         "http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/Fiddlesticks.png",
//       teamId: 100,
//     },
//     {
//       summonerName: "Tjorven",
//       profileIconUrl:
//         "http://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/4495.png",
//       championName: "Xerath",
//       championPic:
//         "http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/Xerath.png",
//       teamId: 100,
//     },
//     {
//       summonerName: "Death B1ossom",
//       profileIconUrl:
//         "http://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/3458.png",
//       championName: "Sett",
//       championPic:
//         "http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/Sett.png",
//       teamId: 200,
//     },
//     {
//       summonerName: "Eminem BroxD",
//       profileIconUrl:
//         "http://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/4066.png",
//       championName: "Jinx",
//       championPic:
//         "http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/Jinx.png",
//       teamId: 200,
//     },
//     {
//       summonerName: "TT Twisters",
//       profileIconUrl:
//         "http://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/5428.png",
//       championName: "Warwick",
//       championPic:
//         "http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/Warwick.png",
//       teamId: 200,
//     },
//     {
//       summonerName: "Ogrom",
//       profileIconUrl:
//         "http://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/5316.png",
//       championName: "Syndra",
//       championPic:
//         "http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/Syndra.png",
//       teamId: 200,
//     },
//     {
//       summonerName: "Ahronavia",
//       profileIconUrl:
//         "http://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/5413.png",
//       championName: "Morgana",
//       championPic:
//         "http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/Morgana.png",
//       teamId: 200,
//     },
//   ],
//   prediction: 0,
// };

let boxSx = {
  m: 8,
  p: 2,
};
let blueCardSx = {
  width: "33%",
  backgroundColor: "#5DA7DB",
};
let cardSx = {
  height: "100%",
  backgroundColor: "grey",
};
let redCardSx = {
  width: "33%",
  backgroundColor: "#FF5858",
};
let stackSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const Pass = () => {
  const { participants, prediction } = React.useContext(renderContext);
  return (
    <Box className="cardBox" sx={boxSx}>
      <Stack sx={stackSx} direction={"row"} spacing={2}>
        <Card className="blueTeam" elevation={4} sx={blueCardSx}>
          <List>{participants.slice(0, 5).map(createListItem)}</List>
        </Card>
        <Card className="result" elevation={2} sx={cardSx} p={10}>
          <div padding={10}>
            <img
              alt="Victory Pic"
              src={prediction[0] === 0 ? blue : red}
              height="400"
              width="100%"
              fit="cover"
              errorIcon={true}
              bgColor="inherit"
            />
          </div>
        </Card>
        <Card className="redTeam" elevation={4} sx={redCardSx}>
          <List>{participants.slice(5).map(createListItem)}</List>
        </Card>
      </Stack>
    </Box>
  );
};

const Fail = () => {
  const { errMsg } = React.useContext(renderContext);
  return (
    <Stack sx={stackSx} direction={"column"} spacing={2}>
      <img src={errGif} alt="Error gif" />
      <Typography variant="h6">{errMsg}</Typography>
    </Stack>
  );
};

export { Pass, Fail };
