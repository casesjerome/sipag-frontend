import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedin: false,
  token: null,
  login: (tkn, userId, username) => {},
  logout: () => {},
  userDetails: {},
  userDetailsHandler: (userDetailsValue) => {}
});
