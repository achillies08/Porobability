import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import { Box, Stack } from "@mui/system";
import red from "./resources/red.png";
import blue from "./resources/blue.png";

const Cards = () => {
  let boxSx = {
    m: 8,
    p: 2,
  };
  let blueCardSx = {
    width: 400,
    backgroundColor: "#5DA7DB",
  };
  let cardSx = {
    height: 440,
    backgroundColor: "grey",
  };
  let redCardSx = {
    width: 400,
    backgroundColor: "#FF5858",
  };
  let stackSx = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <Box className="cardBox" sx={boxSx}>
      <Stack sx={stackSx} direction={"row"} spacing={2}>
        <oneCard />
        <Card className="blueTeam" elevation={4} sx={blueCardSx}>
          <List>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Champ 1"
                  src="https://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/588.png"
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography variant="h6" align="center">
                      Summoner 1
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography align="center">Champ 1</Typography>
                  </React.Fragment>
                }
              ></ListItemText>
              <Avatar
                alt="Summoner 1"
                src="https://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/Ahri.png"
              />
            </ListItem>
            <Divider variant="middle"></Divider>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Summoner 2"
                  src="https://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/4149.png"
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography variant="h6" align="center">
                      Summoner 1
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography align="center">Champ 1</Typography>
                  </React.Fragment>
                }
              ></ListItemText>
              <Avatar
                alt="Champ 2"
                src="https://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/MissFortune.png"
              />
            </ListItem>
            <Divider variant="middle"></Divider>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Summoner 3"
                  src="https://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/1301.png"
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography variant="h6" align="center">
                      Summoner 1
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography align="center">Champ 1</Typography>
                  </React.Fragment>
                }
              ></ListItemText>
              <Avatar
                alt="Champ 3"
                src="https://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/Caitlyn.png"
              />
            </ListItem>
            <Divider variant="middle"></Divider>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Summoner 4"
                  src="https://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/3009.png"
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography variant="h6" align="center">
                      Summoner 1
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography align="center">Champ 1</Typography>
                  </React.Fragment>
                }
              ></ListItemText>
              <Avatar
                alt="Champ 4"
                src="https://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/Lux.png"
              />
            </ListItem>
            <Divider variant="middle"></Divider>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Summoner 5"
                  src="https://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/3849.png"
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography variant="h6" align="center">
                      Summoner 1
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography align="center">Champ 1</Typography>
                  </React.Fragment>
                }
              ></ListItemText>
              <Avatar
                alt="Champ 5"
                src="https://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/Seraphine.png"
              />
            </ListItem>
          </List>
        </Card>
        <Card className="result" elevation={2} sx={cardSx} p={10}>
          <div padding={10}>
            <img
              alt="Victory Pic"
              src={red}
              height="400"
              width="100%"
              fit="cover"
              errorIcon={true}
              bgColor="inherit"
            />
          </div>
        </Card>
        <Card className="redTeam" elevation={4} sx={redCardSx}>
          <List>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Champ 1"
                  src="https://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/3592.png"
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography variant="h6" align="center">
                      Summoner 1
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography align="center">Champ 1</Typography>
                  </React.Fragment>
                }
              ></ListItemText>
              <Avatar
                alt="Summoner 1"
                src="https://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/Sett.png"
              />
            </ListItem>
            <Divider variant="middle"></Divider>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Summoner 2"
                  src="https://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/3180.png"
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography variant="h6" align="center">
                      Summoner 1
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography align="center">Champ 1</Typography>
                  </React.Fragment>
                }
              ></ListItemText>
              <Avatar
                alt="Champ 2"
                src="https://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/Mordekaiser.png"
              />
            </ListItem>
            <Divider variant="middle"></Divider>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Summoner 3"
                  src="https://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/904.png"
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography variant="h6" align="center">
                      Summoner 1
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography align="center">Champ 1</Typography>
                  </React.Fragment>
                }
              ></ListItemText>
              <Avatar
                alt="Champ 3"
                src="https://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/Zilean.png"
              />
            </ListItem>
            <Divider variant="middle"></Divider>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Summoner 4"
                  src="https://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/3218.png"
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography variant="h6" align="center">
                      Summoner 1
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography align="center">Champ 1</Typography>
                  </React.Fragment>
                }
              ></ListItemText>
              <Avatar
                alt="Champ 4"
                src="https://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/Leona.png"
              />
            </ListItem>
            <Divider variant="middle"></Divider>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Summoner 5"
                  src="https://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/3493.png"
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography variant="h6" align="center">
                      Summoner 1
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography align="center">Champ 1</Typography>
                  </React.Fragment>
                }
              ></ListItemText>
              <Avatar
                alt="Champ 5"
                src="https://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/XinZhao.png"
              />
            </ListItem>
          </List>
        </Card>
      </Stack>
    </Box>
  );
};

export default Cards;
