import React from "react";
import { useLocation } from "react-router-dom";

const ConformationPage = () => {
  const location = useLocation();
  return (
    <>
      <h1>Conformation</h1>
      <p>
        We sent conformation link to your email <strong>{location?.state?.email}</strong>
      </p>
      <p>Please check your email.</p>
    </>
  );
};

export default ConformationPage;
