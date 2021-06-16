import React, { useContext } from "react";

import { AuthContext } from "../../context/auth-context";

import "./Navlink.css";

export default function Navlink() {
  const auth = useContext(AuthContext);
  return (
    <ul className="nav side-menu">
      <li className="nav-item dropdown">
        <span
          className="nav-link dropdown-toggle"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Settings
        </span>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <button className="dropdown-item">Delete All Notes</button>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <button className="dropdown-item">Delete Account</button>
          </li>
          <li>
            <button onClick={auth.logout} className="dropdown-item">
              Logout
            </button>
          </li>
        </ul>
      </li>
    </ul>
  );
}
