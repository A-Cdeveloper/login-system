import { createContext, useState, useEffect, useCallback } from "react";
import { userManageCredential } from "../util/http";

let timer;

export const AuthContext = createContext({
  user: {
    first_name: "",
    last_name: "",
    email: "",
  },
  token: null,
  refreshToken: null,
  login: (token) => {},
  logout: () => {},
});

// remaining time before token expired
const calculateRemainingTime = (expirationDate) => {
  const now = new Date();
  const date = new Date(expirationDate);
  const remainingTime = date - now;
  return remainingTime;
};

// get token from localstorage
const getStoredTokenData = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 0) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("user");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    user: storedUser,
  };
};

const AuthContextProvider = ({ children }) => {
  const tokenData = getStoredTokenData();

  //console.log(tokenData);

  let initialToken;
  let initialUser;
  if (tokenData) {
    initialToken = tokenData.token;
    initialUser = tokenData.user;
  }

  const [token, setToken] = useState(initialToken);
  const [refToken, setRefToken] = useState(null);
  const [user, setUser] = useState(initialUser);

  const loginHandler = (first_name, last_name, email, accessToken, refreshToken, expirationTime) => {
    setToken(accessToken);
    setRefToken(refreshToken);
    setUser({ first_name: first_name, last_name: last_name, email });
    localStorage.setItem("token", accessToken);
    localStorage.setItem("expirationTime", expirationTime);
    localStorage.setItem("user", JSON.stringify({ first_name: first_name, last_name: last_name }));
  };

  const logoutHandler = useCallback(() => {
    setToken(null);
    setRefToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("user");
  }, []);

  //autologou after 1h
  // useEffect(() => {
  //   if (tokenData) {
  //     timer = setTimeout(() => {
  //       userManageCredential(refToken, "logout");
  //       logoutHandler();
  //     }, tokenData.duration);
  //   }
  //   return () => clearTimeout(timer);
  // }, [tokenData, logoutHandler, refToken]);

  //refresh token after expire after 59min
  useEffect(() => {
    if (tokenData) {
      timer = setTimeout(async () => {
        const res = await userManageCredential(refToken, "refresh_token");
        const data = await res.json();
        //console.log(data);
        setToken(data.accessToken);
        setRefToken(data.refreshToken);
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("expirationTime", data.expiresIn);
      }, 1000 * 60 * 59);
    }
    return () => clearTimeout(timer);
  }, [refToken, tokenData]);

  const value = {
    isLogedIn: !!token,
    user: user,
    token: token,
    refreshToken: refToken,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
