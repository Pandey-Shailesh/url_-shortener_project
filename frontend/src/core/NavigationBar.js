import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#7952b3" };
  } else {
    return { color: "#000000" };
  }
};

const NavigationBar = ({ history }) => (
  <div>
    <nav className="navbar navbar-light ">

      <ul className="nav nav-tabs  d-flex flex-row ">





        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              style={currentTab(history, "/user/dashboard")}
              className="nav-link"
              to="/user/dashboard"
            >
              u. Dashboard
            </Link>
          </li>
        )}

        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/signup")}
                className="nav-link"
                to="/signup"
              >
               <button
                className="u-btn"
              >
                Sign Up
              </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/signin")}
                className="nav-link"
                to="/signin"
              >
               <button
                className="u-btn"
              >
                Sign In
              </button>
              </Link>
            </li>
          </Fragment>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <span
              className="nav-link text-warning"
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
            >
               <button
                className="u-btn"
              >
                Sign Out
              </button>
            </span>
          </li>
        )}
      </ul>
    </nav>
  </div>
);

export default withRouter(NavigationBar);
