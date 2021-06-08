import React, { useCallback, useState, useContext } from "react";
import axios from "axios";
import qs from "qs";

import Input, { resetValues } from "../../shared/components/FormElements/Input";
import { AuthContext } from "../../shared/components/context/auth-context";
import "./Auth.css";

const Auth = (props) => {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState({
    username: "",
    password: "",
    isRegistered: true,
  });
  const [isRegistered, setIsRegistered] = useState(true);

  //Authentication
  function authenticateUser(user) {
    let body = qs.stringify({
      username: user.username,
      password: user.password,
    });
    if (user.isRegistered) {
      axios
        .post("http://localhost:8080/login", body, {
          "Content-Type": "application/x-www-form-urlencoded",
        })
        .then((response) => {
          const { userId, username } = response.data.data;
          const userDetailsValue = { _id: userId, username: username };
          auth.userDetailsHandler(userDetailsValue);
          auth.login();
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:8080/register", body, {
          "Content-Type": "application/x-www-form-urlencoded",
        })
        .then((response) => {
          const { userId, username } = response.data.data;
          const userDetailsValue = { _id: userId, username: username };
          auth.userDetailsHandler(userDetailsValue);
          auth.login();
          console.log(auth.isLoggedin);
        })
        .catch((err) => console.log(err));
    }
  }

  //Input Handler
  const authInputHandler = useCallback(
    (name, value) => {
      setUser((prevInput) => {
        return { ...prevInput, [name]: value, isRegistered: isRegistered };
      });
    },
    [isRegistered]
  );

  //Is Registered Handler
  const switchModeHandler = () => {
    setIsRegistered((prevMode) => !prevMode);
  };

  //On Form Submit
  function authSubmitHandler(e) {
    e.preventDefault();
    authenticateUser(user);
    setUser({ username: "", password: "" });    
  }

  return (
    <div className="container-fluid">
      <div className="row mt-6">
        <div className="col-lg-4 col-md-2"></div>
        <div className="col-lg-4 col-md-8">
          <div className="login-form">
            <main className="form-signin">
              <form onSubmit={authSubmitHandler}>
                <div className="mb-4 line-top" alt="" width="100%" />
                <h1 className="h3  fw-normal title d-flex justify-content-center">
                  produktibo
                </h1>
                <p className="text-muted mb-5 subtitle">Improve your productivity</p>
                <Input
                  type="email"
                  id="username"
                  name="username"
                  divClass="form-floating mb-1 mx-6"
                  placeholder="name@example.com"
                  elementType="input"
                  isLabelVisible={true}
                  label="Username"
                  onInput={authInputHandler}
                />
                <Input
                  type="password"
                  id="password"
                  name="password"
                  divClass="form-floating mb-3 mx-6"
                  placeholder=""
                  elementType="input"
                  isLabelVisible={true}
                  label="Password"
                  onInput={authInputHandler}
                />
                <div className="px-6 mb-1">
                  <button
                    className="w-100 btn btn-lg btn-success"
                    type="submit"
                  >
                    {isRegistered ? "Sign in" : "Continue"}
                  </button>
                </div>
                <p className="mt-5 mb-1 text-muted d-flex justify-content-center fs-6">
                  {isRegistered
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </p>
              </form>
              <div className="mb-3 d-flex justify-content-center ">
                <button
                  className="fs-5 signup-text auth-option-button"
                  onClick={switchModeHandler}                  
                >
                  {isRegistered ? "Create account" : "Sign in"}
                </button>
              </div>
            </main>
          </div>
        </div>
        <div className="col-lg-4 col-md-2"></div>
      </div>
    </div>
  );
};

export default Auth;
