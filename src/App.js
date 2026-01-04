import "./App.scss";
import Nav from "./components/Navigation/Nav";
import AppRoutes from "./routes/AppRoutes";
import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    let dataAccount = sessionStorage.getItem("account");
    if (dataAccount) {
      setAccount(JSON.parse(dataAccount));
    }
  }, []);

  return (
    <>
      <Router>
        <div className="app-header">
          <Nav />
        </div>
        <div className="app-container">
          <AppRoutes />
        </div>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </>
  );
}

export default App;
