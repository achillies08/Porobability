import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

const createListItem = (participant) => {
  return (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Summoner" src={participant.profileIconUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="h6" align="center">
                {participant.summonerName}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography align="center">{participant.championName}</Typography>
            </React.Fragment>
          }
        ></ListItemText>
        <Avatar alt="Champ" src={participant.championPic} />
      </ListItem>
      <Divider variant="middle" />
    </div>
  );
};

export default createListItem;
