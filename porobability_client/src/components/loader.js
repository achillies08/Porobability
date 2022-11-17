import { Card } from "@mui/material";
import * as React from "react";
import loaderGif from "./resources/loaderGif.gif";

let stackSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transparent",
};

const Loader = () => {
  return (
    <Card sx={stackSx} elevation={0} direction={"column"} spacing={2}>
      <img
        alt="Loader"
        src={loaderGif}
        height="50%"
        width="50%"
        errorIcon={true}
        bgColor="inherit"
      />
    </Card>
  );
};

export default Loader;
