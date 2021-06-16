import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedin: false,
  token: null,
  login: (tkn) => {},
  logout: () => {},
  userDetails: {},
  userDetailsHandler: (userDetailsValue) => {}
});
