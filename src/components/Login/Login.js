import React from "react";
import "./Login.scss";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const History = useHistory();
  const handleCreateNewAccount = () => {
    History.push("/register");
  }
  
  return (
    <div className="login-container">
      <div className="container">
        <div className="row px-3 px-sm-0">

          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">MinhHieuEnter</div>
            <div className="detail">
              Tell me and I forget, teach me and I may remember, involve me and
              I learn.
            </div>
          </div>

            <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3">
              <div className="brand d-sm-none">MinhHieuEnter</div>
              <input
                type="text"
                className="form-control"
                placeholder="Email address or phone number"
              />
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
              <button className="btn btn-primary">Login</button>
              <span className="text-center">
                <a className="forgot-password" href="#">
                  Forgot your password?
                </a>
              </span>
              <hr />
              <div className="text-center">
                <button className="btn btn-success" onClick={() => handleCreateNewAccount()}>
                 Create a new account
                </button>
              </div>
            </div>

        </div>
      </div>
    </div>
  );
};
export default Login;
