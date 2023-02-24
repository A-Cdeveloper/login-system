import React from "react";
import { Formik, Form } from "formik";

import { Button } from "reactstrap";
import { TextInput } from "./FormSingleElements";
import ValidationObj from "./Validation";

import * as Yup from "yup";

const FormTemplate = ({ fields, onSubmit }) => {
  let initialValues = {};
  fields.map((el) => {
    return (initialValues[el.name] = "");
  });

  let requiredValues = {};
  fields.map((el) => {
    return el.required ? (requiredValues[el.name] = el.name) : null;
  });

  return (
    <Formik
      initialValues={initialValues}
      isInitialValid={false}
      validationSchema={Yup.object(ValidationObj(requiredValues))}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ isValid }) => (
        <Form>
          {fields.map((el) => {
            return <TextInput key={el.name} type={el.type} label={el.label} name={el.name} id={el.name} />;
          })}
          <Button type="submit" color="success" size="lg" disabled={!isValid}>
            SUBMIT
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormTemplate;
