import { SERVER_URL } from "../config";

export const login = async (email: string, password: string) => {
  const res = await fetch(`${SERVER_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: email, password }),
  });
  return res.json();
};

export const register = async (
  fullname: string,
  email: string,
  password: string
) => {
  const res = await fetch(`${SERVER_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fullname, email, password }),
  });
  return res.json();
};

export const verify = (token: string) => {
  // If the token exists, verify it with the auth server to see if it is valid
  return fetch(`${SERVER_URL}/auth/verify`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
