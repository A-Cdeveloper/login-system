const API_URL = "http://192.168.0.149:8080";

export const userLogin = async ({ username, password }) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const userManageCredential = async (refreshToken, marker) => {
  if (marker !== "logout") {
    marker = "refresh_token";
  }
  const response = await fetch(`${API_URL}/users/${marker}`, {
    method: "POST",
    body: JSON.stringify({
      refreshToken: refreshToken,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};
