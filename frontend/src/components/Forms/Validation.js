import * as Yup from "yup";

const ValidationObj = ({ username, password, firstname, lastname, email }) => {
  return {
    username: username ? Yup.string().trim().required("This filed is required") : null,
    password: password ? Yup.string().trim().required("This filed is required").min(10, "Password must be at least 10 characters").max(15, "Password must be max 15 characters") : null,
    firstname: firstname ? Yup.string().trim().required("This filed is required") : null,
    lastname: lastname ? Yup.string().trim().required("This filed is required") : null,
    email: email ? Yup.string().trim().email("E-Mail must be valid").required("This filed is required") : null,
  };
};

export default ValidationObj;
