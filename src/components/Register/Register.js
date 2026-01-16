import { useEffect, useState } from "react";
import "./Register.scss";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import userService from "../../services/userService";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const defaultValid = {
    isValidEmail: true,
    isValidPhoneNumber: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objCheckValid, setObjCheckValid] = useState(defaultValid);

  const History = useHistory();
  const handleLogin = () => {
    History.push("/login");
  };

  useEffect(() => {
    let dataAccount = sessionStorage.getItem("account");
    if (dataAccount) {
      History.push("/");
      window.location.reload();
    }
  }, []);

  const isValidInput = () => {
    setObjCheckValid(defaultValid);

    if (!email) {
      toast.error("Email is required!");
      setObjCheckValid((prev) => ({ ...prev, isValidEmail: false }));
      return false;
    }

    let regx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!String(email).toLowerCase().match(regx)) {
      toast.error("please enter a vaild email address");
      setObjCheckValid((prev) => ({ ...prev, isValidEmail: false }));
      return false;
    }

    if (!phoneNumber) {
      toast.error("Phone number is required!");
      setObjCheckValid((prev) => ({ ...prev, isValidPhoneNumber: false }));
      return false;
    }

    if (!password) {
      toast.error("Password is required!");
      setObjCheckValid((prev) => ({ ...prev, isValidPassword: false }));
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password do not match!");
      setObjCheckValid((prev) => ({ ...prev, isValidConfirmPassword: false }));
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!isValidInput()) return;

    try {
      let data = await userService.registerNewUser({
        email,
        phoneNumber,
        username,
        password,
      });

      if (data.EC === "0") {
        toast.success(data.EM);
        History.push("/login");
      } else {
        toast.error(data.EM);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.EM);
      } else {
        toast.error("Something went wrong, please try again!");
      }
    }
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
                className={
                  objCheckValid.isValidEmail
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Phone number: </label>
              <input
                type="text"
                className={
                  objCheckValid.isValidPhoneNumber
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className={
                  objCheckValid.isValidPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                className={
                  objCheckValid.isValidConfirmPassword
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={() => handleRegister()}
            >
              Register
            </button>

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
