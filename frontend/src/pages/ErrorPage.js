import React from "react";
import { useRouteError, Link } from "react-router-dom";

import { Container } from "reactstrap";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const ErrorPage = () => {
  const error = useRouteError();

  let title = "An Error ocurred";
  let message = "Something goes wrong!!!";

  if (error.status === 500) {
    message = error.data.message;
  }
  if (error.status === 404) {
    title = "Not found";
    message = "Could not find a page";
  }

  console.log(error);
  return (
    <Container fluid>
      <Header />
      <Container tag="main">
        <div className="text-center">
          <h1>{title}</h1>
          <p>{message}</p>
          <Link to="/?mode=login">Go to homepage</Link>
        </div>
      </Container>
      <Footer />
    </Container>
  );
};

export default ErrorPage;
