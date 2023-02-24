import React from "react";
import classes from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={classes.backdrop}>
      <span className={classes.loader}></span>
    </div>
  );
};

export default Loader;
