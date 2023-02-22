import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../store/authContext";

const ProtectedRoute = ({ children, redirectTo }) => {
  const authCtx = useContext(AuthContext);

  let isAuthenticated = authCtx.isLogedIn;
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
