import React from "react";
import classes from "./Form.module.scss";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import Card from "../ui/Card";

import { Button } from "reactstrap";
import { TextInput } from "./FormElements";

const validationSchema = Yup.object({
  firstname: Yup.string().trim().required("This filed is required"),
  lastname: Yup.string().trim().required("This filed is required"),
  email: Yup.string().trim().email("E-Mail must be valid").required("This filed is required"),
  username: Yup.string().trim().required("This filed is required"),
  password: Yup.string().trim().required("This filed is required").min(10, "Password must be at least 10 characters").max(15, "Password must be max 15 characters"),
});

const RegisterForm = ({ title, errorMsg, onRegister }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <h2 className="text-center mb-4">{title}</h2>

      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          email: "",
          username: "",
          password: "",
        }}
        isInitialValid={false}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onRegister(values);
          navigate("/conformation", { replace: true, state: { email: values.email } });
        }}
      >
        {({ isValid }) => (
          <Form>
            <TextInput type="text" label="First name" name="firstname" id="firstname" />
            <TextInput type="text" label="Last name" name="lastname" id="lastname" />
            <TextInput type="email" label="E-Mail" name="email" id="email" />
            <TextInput type="text" label="Username" name="username" id="username" />
            <TextInput type="password" label="Password" name="password" id="password" />
            <Button type="submit" color="success" size="lg" disabled={!isValid}>
              SUBMIT
            </Button>
          </Form>
        )}
      </Formik>

      <p className={classes.account}>
        <Link to="/userarea/?mode=login">Login to your account.</Link>
      </p>
      {errorMsg && <p className={classes.error}>{errorMsg}</p>}
    </Card>
  );
};

export default RegisterForm;
