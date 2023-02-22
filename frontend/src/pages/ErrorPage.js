import React from "react";
import { Container } from "reactstrap";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const ErrorPage = () => {
  return (
    <Container fluid>
      <Header />
      <Container tag="main">
        <h1>ERROR</h1>
      </Container>
      <Footer />
    </Container>
  );
};

export default ErrorPage;
