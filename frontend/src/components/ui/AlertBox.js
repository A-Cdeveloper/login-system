import React from "react";
import { UncontrolledAlert } from "reactstrap";
import classes from "./AlertBox.module.scss";

export const AlertBox = ({ children, type }) => {
  let color;
  if (type !== "successLogin") {
    color = "danger";
  }

  return (
    <UncontrolledAlert color={color} fade={true} className={classes.alertbox}>
      {children}
    </UncontrolledAlert>
  );
};

export default AlertBox;
