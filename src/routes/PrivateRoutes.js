import { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";


const PrivateRoutes = (props) => {
    const History = useHistory();
    useEffect(() => {
        let dataAccount = sessionStorage.getItem("account");
        if (!dataAccount) {
          History.push("/login");
          window.location.reload();
        }

      }, []);

  //useEffect(() => {}, []);
  return <>
    <Route path={props.path} component={props.component} />
  </>;
};

export default PrivateRoutes;
