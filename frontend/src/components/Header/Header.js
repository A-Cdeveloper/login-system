import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";
import { NavLink as RootLink, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../store/authContext";

import { userManageCredential } from "../../util/http";

import logo from "../../assets/logo.png";

const Header = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Container tag="header" className="p-4 border-bottom border-bottom-1 border-secondary">
      <Row className="justify-content-between align-items-center">
        <Col lg={2}>
          <img src={logo} style={{ height: "70px" }} alt="logo" />
          {authCtx.isLogedIn ? "TRUE" : "FALSE"}
          {/* <h1>
            token: {authCtx.token}
            <br />
            ref token: {authCtx.refreshToken}
          </h1> */}
        </Col>
        <Col className="" lg={7}>
          <Nav pills>
            {authCtx.isLogedIn && (
              <>
                <NavItem>
                  <NavLink tag={RootLink} to={"dashboard"}>
                    Dashboard
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={RootLink} to={"projects"}>
                    Projects
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={RootLink} to={"clients"}>
                    Clients
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Col>
        <Col className="flex-column justify-content-center" lg={3}>
          <p className="userarea text-end">
            {/* {!authCtx.isLogedIn && <Link to={"userarea/?mode=login"}>Login/Register</Link>} */}
            {authCtx.isLogedIn && (
              <>
                Welcome{" "}
                <strong>
                  {authCtx.user.first_name} {authCtx.user.last_name}
                </strong>{" "}
                &nbsp;
                <Link
                  to={"userarea/?mode=login"}
                  onClick={() => {
                    userManageCredential(authCtx.refreshToken, "logout");
                    authCtx.logout();
                  }}
                >
                  Logout
                </Link>
              </>
            )}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
