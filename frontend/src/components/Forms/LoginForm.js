import React from "react";
import classes from "./Form.module.scss";
import { Link } from "react-router-dom";

import Card from "../ui/Card";

import FormTemplate from "./FormTemplate";

const fields = [
  {
    name: "username",
    label: "Username",
    type: "text",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
  },
];

const LoginForm = ({ title, errorMsg, onLogin }) => {
  return (
    <Card>
      <h2 className="text-center mb-4">{title}</h2>
      <FormTemplate onSubmit={onLogin} fields={fields} />

      <p className={classes.account}>
        <Link to="/?mode=register">Create an account.</Link>
      </p>

      {errorMsg && <p className={classes.error}>{errorMsg}</p>}
    </Card>
  );
};

export default LoginForm;
