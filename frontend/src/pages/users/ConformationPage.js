import React from "react";
import { useLocation } from "react-router-dom";

const ConformationPage = () => {
  const location = useLocation();
  return (
    <div className="text-center">
      <h1>Validate your account.</h1>
      <p>
        We sent conformation link to your email <strong>{location?.state?.email}</strong>
      </p>
      <p>Please check your email.</p>
    </div>
  );
};

export default ConformationPage;
