import * as React from "react";
import loaderGif from "./resources/loaderGif.gif";
const Loader = () => {
  return (
    <img
      alt="Loader"
      src={loaderGif}
      height="50%"
      width="50%"
      fit="cover"
      errorIcon={true}
      bgColor="inherit"
    />
  );
};

export default Loader;
