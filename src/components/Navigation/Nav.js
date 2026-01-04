import React, { useEffect } from "react";
import "./Nav.scss";
import { NavLink, useLocation } from "react-router-dom";

function Nav(props) {
  const [isShow, setIsShow] = React.useState(false);
  let location = useLocation();
  useEffect(() => {
    if (location.pathname !== "/login" && location.pathname !== "/register") {
      setIsShow(true);
       
    } else {
      setIsShow(false);
    }
  }, []);
  return (
    <>
    {isShow && (
      <div className="topnav">
        <NavLink to="/" exact>
          Home
        </NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/project">Project</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
    )}
    </>
  );
}

export default Nav;
