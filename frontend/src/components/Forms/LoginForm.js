import React from "react";
import classes from "./Form.module.scss";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import Card from "../ui/Card";

import { Button } from "reactstrap";
import { TextInput } from "./FormElements";

const validationSchema = Yup.object({
  username: Yup.string().trim().required("This filed is required"),
  password: Yup.string().trim().required("This filed is required").min(10, "Password must be at least 10 characters").max(15, "Password must be max 15 characters"),
  // message: Yup.string()
  //   .trim()
  //   .required("This filed is required")
  //   .min(10, (obj) => `Minimum characters 10. Left ${10 - obj.value.length}`),
});

const LoginForm = ({ title, errorMsg, onLogin }) => {
  return (
    <Card>
      <h2 className="text-center mb-4">{title}</h2>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        isInitialValid={false}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onLogin(values);
        }}
      >
        {({ isValid }) => (
          <Form>
            <TextInput type="text" label="Username" name="username" id="username" />
            <TextInput type="password" label="Password" name="password" id="password" />

            {/*<TextInput type="textarea" label="Message" name="message" id="message" rows="4" />
             <Checkbox name="terms">I accept the terms and conditions</Checkbox>
            <Select type="select" label="Gender" name="gender" id="gender">
              male, female
            </Select>

            <RadioBox name="radios" type="radio" label="Radio 1" value="Radio 1" />
            <RadioBox name="radios" type="radio" label="Radio 2" value="Radio 2" /> */}

            <Button type="submit" color="success" size="lg" disabled={!isValid}>
              SUBMIT
            </Button>
          </Form>
        )}
      </Formik>

      {/* ADVANCED 
      <label htmlFor="username">Username</label>
            <Field name="username" type="text" />
            <ErrorMessage name="username" render={(err) => <p className={classes.error}>{err}</p>} /> */}

      {/* <label htmlFor="password">Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" render={(err) => <p className={classes.error}>{err}</p>} /> */}

      {/* BASIC 
      <Form className={classes.form} onSubmit={formik.handleSubmit}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input id="username" name="username" type="text" {...formik.getFieldProps("username")} />
          {formik.touched.username && formik.errors.username ? <p className={classes.error}>{formik.errors.username}</p> : null}
        </FormGroup>

        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" name="password" type="password" {...formik.getFieldProps("password")} />
          {formik.touched.password && formik.errors.password ? <p className={classes.error}>{formik.errors.password}</p> : null}
        </FormGroup>
        <Button type="submit" color="success" size="lg">
          SUBMIT
        </Button>
      </Form> */}
      <p className={classes.account}>
        <Link to="/userarea/?mode=register">Create an account.</Link>
      </p>
      {errorMsg && <p className={classes.error}>{errorMsg}</p>}
    </Card>
  );
};

export default LoginForm;
