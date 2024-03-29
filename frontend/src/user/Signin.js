import React, { useState } from "react";
import Base from "../core/Base";
import {  Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;

  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("sigin request failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
        return <Redirect to="/user/dashboard" />;
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };
  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{
              display: error ? "" : "none",
            }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };
  const signInForm = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col signin-content">
            <div>
              <h2 className="heading-line d-inline-flex p-2">Welcome back!</h2>
              <h5 className="guarantee">
                <b>Enter your Credentials to access your account</b>
              </h5>
            </div>
            <form>
              <div className="form-group">

                <input
                  onChange={handleChange("email")}
                  value={email}
                  className="form-control"
                  type="email" placeholder="Email"
                />
              </div>

              <div className="form-group">
                <input
                  onChange={handleChange("password")}
                  value={password}
                  className="form-control"
                  type="password" placeholder="Password"
                />
              </div>
              <br />
              <button
                onClick={onSubmit}
                className="btn"
              >
                Sign In
              </button>
            </form>
          </div>
          <div className="col signin-image  ">
            <img
              src="https://photo.safetyhandler.com/sc0/https:%2F%2Fmedia.safetyhandler.com%2Fmedia%2Fimage%2Fgif%2Fbucket%2Ff5a36ceabfbb6f240347cca1a558d957-0.gif%3Fview=image"
              alt="signin-banner"
              className="signin-banner"
            />
          </div>
        </div>
      </div>

    );
  };

  return (
    <Base title="Sign In page" description="A page for user to sign in!">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default Signin;
