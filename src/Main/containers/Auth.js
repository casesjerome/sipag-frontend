import React, { useCallback } from "react";

import Input from "../../shared/components/FormElements/Input";
import "./Auth.css";

const Auth = () => {
  const inputHandler = useCallback((name, value) => {}, []);
  return (
    <div className="container-login">
      <div className="login-form">
        <main class="form-signin">
          <form>
            <div class="mb-4 logo-top" alt="" width="100%"/>
            <h1 class="h3 mb-5 fw-normal subtitle d-flex justify-content-center">
              produktibo
            </h1>

            <Input
              type="text"
              id="username"
              name="username"
              divClass="mb-1 mx-6"
              placeholder="name@example.com"
              elementType="input"
              isLabelVisible={true}
              label="Username"
              onInput={inputHandler}
            />
            <Input
              type="password"
              id="password"
              name="password"
              divClass="mb-3 mx-6"
              placeholder=""
              elementType="input"
              isLabelVisible={true}
              label="Password"
              onInput={inputHandler}
            />

            <div className="px-6 mb-1">
              <button class="w-100 btn btn-lg btn-success" type="submit">
                Sign in
              </button>
            </div>
            <p class="mt-5 mb-1 text-muted d-flex justify-content-center fs-6">
              Don't have an account?
            </p>
            <p class="mb-3  d-flex justify-content-center fs-5 signup-text">
              Create account
            </p>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Auth;
