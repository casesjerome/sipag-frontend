import React, { useCallback, useState, useContext } from "react";
import axios from "axios";
import qs from "qs";

import Input from "../../shared/components/FormElements/Input";
import LoadingElement from "../../shared/components/UIElements/LoadingElement";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import "./Auth.css";

const Auth = (props) => {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const [ErrorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //Authentication
  function authenticateUser(user) {
    let body = qs.stringify({
      username: user.username,
      password: user.password,
    });
    setIsLoading(true);
    if (isLogin) {
      axios
        .post("http://localhost:8080/api/users/login", body, {
          "Content-Type": "application/x-www-form-urlencoded",
        })
        .then((response) => {
          if (response.status < 200 || response.status > 299) {
            //ToDo
            setErrorMessage(response.data.error);
            setIsLoading(false);
          } else {
            const { userId, username } = response.data.data;
            const { tkn } = response.data;
            //console.log(tkn);
            const userDetailsValue = { _id: userId, username: username };

            auth.userDetailsHandler(userDetailsValue);
            setIsLoading(false);
            auth.login(tkn);
          }
        })
        .catch((err) => {
          setErrorMessage("Username and/or Password is Incorrect");
          setIsLoading(false);
        });
    } else {
      axios
        .post("http://localhost:8080/api/users/register", body, {
          "Content-Type": "application/x-www-form-urlencoded",
        })
        .then((response) => {
          if (response.status < 200 || response.status > 299) {
            //ToDo
            setErrorMessage(response.data.error);
            setIsLoading(false);
          } else {
            const { userId, username } = response.data.data;
            const { tkn } = response.data;            
            const userDetailsValue = { _id: userId, username: username };

            auth.userDetailsHandler(userDetailsValue);
            setIsLoading(false);
            auth.login(tkn);
          }
        })
        .catch((err) => {
          setErrorMessage(err.response.data.error.message);
          setIsLoading(false);
        });
    }
  }

  //Input Handler
  const authInputHandler = useCallback((name, value) => {
    setUser((prevInput) => {
      return { ...prevInput, [name]: value };
    });
  }, []);

  //Is Registered Handler
  const switchModeHandler = () => {
    setIsLogin((prevMode) => !prevMode);
  };

  //On Form Submit
  const authSubmitHandler = (e) => {
    e.preventDefault();
    authenticateUser(user);
  };

  //
  const onClickHandler = (e) => {
    e.preventDefault();
    setErrorMessage(null);
  };

  return (
    <React.Fragment>
      {ErrorMessage && !isLoading && (
        <ErrorModal
          error={ErrorMessage}
          title="Error!"
          onClick={onClickHandler}
        />
      )}
      {isLoading && <LoadingElement />}
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
                  <p className="text-muted mb-5 subtitle">Improve your work</p>
                  <Input
                    type="email"
                    id="username"
                    name="username"
                    divClass="form-floating mb-1 mx-6"
                    placeholder="name@example.com"
                    elementType="input"
                    isLabelVisible={true}
                    label="Email"
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
                    minLength="6"
                    maxLength="20"
                    onInput={authInputHandler}
                  />
                  <div className="px-6 mb-1">
                    <button
                      className="w-100 btn btn-lg btn-success"
                      type="submit"
                    >
                      {isLogin ? "Sign in" : "Continue"}
                    </button>
                  </div>
                  <p className="mt-5 mb-1 text-muted d-flex justify-content-center fs-6">
                    {isLogin
                      ? "Don't have an account?"
                      : "Already have an account?"}
                  </p>
                </form>
                <div className="mb-3 d-flex justify-content-center ">
                  <button
                    className="fs-5 signup-text auth-option-button"
                    onClick={switchModeHandler}
                  >
                    {isLogin ? "Create account" : "Sign in"}
                  </button>
                </div>
              </main>
            </div>
          </div>
          <div className="col-lg-4 col-md-2"></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Auth;
