import React from "react";
import "./Register.scss";
import { useHistory } from "react-router-dom";

const Register = (props) => {
  const History = useHistory();
  const handleLogin = () => {
    History.push("/login");
  };

  return (
    <div className="register-container">
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

            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Email address"
              />
            </div>

            <div className="form-group">
              <label>Phone number: </label>
              <input
                type="text"
                className="form-control"
                placeholder="Phone number"
              />
            </div>

            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>

            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
              />
            </div>

            <button className="btn btn-primary">Register</button>

            <hr />
            <div className="text-center">
              <button className="btn btn-success" onClick={() => handleLogin()}>
                Already have an account? Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
