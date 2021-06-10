import React, { useContext } from "react";

import { AuthContext } from "../context/auth-context";

import Navlink from "./Navlink";

export default function Navbar() {
  const auth = useContext(AuthContext);
  return (
    <nav className="navbar navbar-dark bg-dark ">
      <div className="container justify-content-center">
        <a className="navbar-brand" href="github.com">
          <h1 className="app-logo">Sipag</h1>
        </a>
      </div>
      {auth.isLoggedin && <Navlink />}
    </nav>
  );
}
