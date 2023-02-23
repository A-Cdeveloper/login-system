import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Navigate, useSearchParams, useNavigate } from "react-router-dom";

import { AuthContext } from "../../store/authContext";
import LoginForm from "../../components/Forms/LoginForm";
import RegisterForm from "../../components/Forms/RegisterForm";
import { userLogin, userRegistration } from "../../util/http";

const LoginRegister = () => {
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  let mode = searchParams.get("mode") === "login" ? "login" : "register";
  const auhtCtx = useContext(AuthContext);

  useEffect(() => {
    setError("");
  }, [searchParams]);

  //
  const loginHandler = async (values) => {
    try {
      const res = await userLogin(values);
      const data = await res.json();
      if (res.status === 400) {
        setError(data.message);
        return;
      }
      //console.log(data);
      const { first_name, last_name, email, accessToken, refreshToken, expiresIn } = data;
      auhtCtx.login(first_name, last_name, email, accessToken, refreshToken, expiresIn);
    } catch (error) {
      setError(error);
    }
  };

  //
  const registerHandler = async (values) => {
    try {
      const res = await userRegistration(values);
      const data = await res.json();
      if (res.status === 400) {
        setError(data.message);
        return;
      }
      navigate("/conformation", { replace: true, state: { email: values.email } });
      console.log(data);
    } catch (error) {
      setError(error);
    }
  };

  let content = (
    <Container>
      <Row className="justify-content-center">
        {mode && mode === "login" && (
          <Col xs={8} sm={8} md={6} lg={4} xl={3}>
            <LoginForm title="Login" errorMsg={error} onLogin={loginHandler} />
          </Col>
        )}
        {mode && mode === "register" && (
          <Col xs={8} sm={8} md={6} lg={4} xl={4}>
            <RegisterForm title="Create account" errorMsg={error} onRegister={registerHandler} />
          </Col>
        )}
      </Row>
    </Container>
  );

  if (auhtCtx.isLogedIn) {
    content = <Navigate to="/dashboard" replace={true} />;
  }

  return <>{content}</>;
};

export default LoginRegister;
