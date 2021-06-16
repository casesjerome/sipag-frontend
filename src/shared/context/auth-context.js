import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedin: false,
  login: () => {},
  logout: () => {},
  userDetails: {},
  userDetailsHandler: (userDetailsValue) => {}
});
