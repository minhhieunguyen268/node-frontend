import { useEffect, useState } from "react";
import "./Login.scss";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import userService from "../../services/userService";

const Login = (props) => {
  const History = useHistory();

  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");
  const defaultValid = {
    isValidValueLogin: true,
    isValidPassword: true,
  };
  const [objCheckValid, setObjCheckValid] = useState(defaultValid);

  const handleCreateNewAccount = () => {
    History.push("/register");
  };

  const isValidInput = () => {
    setObjCheckValid(defaultValid);

    if (!valueLogin) {
      toast.error("Email or phone number is required!");
      setObjCheckValid((prev) => ({ ...prev, isValidValueLogin: false }));
      return false;
    }

    if (!password) {
      toast.error("Password is required!");
      setObjCheckValid((prev) => ({ ...prev, isValidPassword: false }));
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!isValidInput()) return;

    try {
      const response = await userService.loginUser({
        valueLogin: valueLogin,
        password: password,
      });
      let data = response.data;
      if (data.EC === "0") {
        toast.success(data.EM);
        let dataAccount = {
          isAuthenticated: true,
          token: "fake-jwt-token",
          user: data.DT,
        };
        sessionStorage.setItem("account", JSON.stringify(dataAccount));
        History.push("/users");
        window.location.reload();
      } else {
        toast.error(data.EM);
      }
    } catch (error) {
      toast.error("Login failed:", error);
    }
  };

  const handlePressEnter = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    let dataAccount = sessionStorage.getItem("account");
    if (dataAccount) {
      History.push("/");
      window.location.reload();
    }
  }, []);

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
              className={
                objCheckValid.isValidValueLogin
                  ? "form-control"
                  : "form-control is-invalid"
              }
              placeholder="Email address or phone number"
              value={valueLogin}
              onChange={(e) => setValueLogin(e.target.value)}
            />
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
              onKeyPress={(e) => handlePressEnter(e)}
            />
            <button className="btn btn-primary" onClick={() => handleLogin()}>
              Login
            </button>
            <span className="text-center">
              <a className="forgot-password" href="/reset-password">
                Forgot your password?
              </a>
            </span>
            <hr />
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => handleCreateNewAccount()}
              >
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
