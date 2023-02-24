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
  {
    name: "firstname",
    label: "First Name",
    type: "text",
    required: true,
  },
  {
    name: "lastname",
    label: "Last Name",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "E-Mail",
    type: "email",
    required: true,
  },
];

const RegisterForm = ({ title, errorMsg, onRegister }) => {
  return (
    <Card>
      <h2 className="text-center mb-4">{title}</h2>

      <FormTemplate onSubmit={onRegister} fields={fields} />

      <p className={classes.account}>
        <Link to="/?mode=login">Login to your account.</Link>
      </p>
      {errorMsg && <p className={classes.error}>{errorMsg}</p>}
    </Card>
  );
};

export default RegisterForm;
