import { Switch, Route } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Users from "../components/ManagerUsers/Users";
import NotFound from "../components/404Error/404error";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = (props) => {
  return (
    <>
      <Switch>
        {/* <Route path="/project">project</Route>
            <Route path="/users">
              <Users />
            </Route> */}
        <PrivateRoutes path="/users" component={Users} />
        <PrivateRoutes path="/project" component={() => <div>project</div>} />

        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/" exact>
          Home
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default AppRoutes;
