import { useContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "reactstrap";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import AlertBox from "../components/ui/AlertBox";

import { AuthContext } from "../store/authContext";

let initial = true;

const RootLayout = () => {
  const ctxAuth = useContext(AuthContext);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!initial) {
      setShowAlert(true);
    }
    let timer = setTimeout(() => setShowAlert(false), 3000);
    initial = false;
    return () => {
      clearTimeout(timer);
    };
  }, [ctxAuth.isLogedIn]);

  return (
    <Container fluid>
      {showAlert && ctxAuth.isLogedIn && <AlertBox type="successLogin">You are now loged in.</AlertBox>}
      {showAlert && !ctxAuth.isLogedIn && <AlertBox type="successLogout">You are now loged out.</AlertBox>}
      <Header />
      <Container tag="main">
        <Outlet />
      </Container>
      <Footer />
    </Container>
  );
};

export default RootLayout;
