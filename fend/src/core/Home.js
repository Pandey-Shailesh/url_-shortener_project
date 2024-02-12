import React, { Fragment } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { signout, isAuthenticated } from "../auth/helper";
const currentTab = (history, path) => {

}

export default function Home({ history }) {
  console.log("API IS ", API);
  return (
    <Base>
      <ul>
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              style={currentTab(history, "/user/dashboard")}
              className="nav-link"
              to="/user/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}

        {!isAuthenticated() && (
          <Fragment>
            <div className="btn-group ">
              <button type="button" class="btn btn-success border border-warning mt-4 p-3 ">
                <Link
                  style={currentTab(history, "/signup")}
                  className="nav-link"
                  to="/signup"
                >
                  Sign Up 😁
                </Link>
              </button>


              <button type="button" class="btn btn-success border border-warning mt-4 p-3">
                <Link
                  style={currentTab(history, "/signin")}
                  className="nav-link"
                  to="/signin"
                >
                  Sign In 😊
                </Link>
              </button>

            </div>

          </Fragment>
        )}
        {isAuthenticated() && (
              <button  onClick={() => {signout(() => { history.push("/");});
              }} type="button" class="btn btn-success border border-warning mt-4 p-3 ">
                Sign Out 😁
              </button>
        )}
      </ul>
    </Base>
  );
}