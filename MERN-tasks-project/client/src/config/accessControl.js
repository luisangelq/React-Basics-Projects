import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";

const AccessControl = ({ component: Component, ...rest }) => {
  const { token } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        !token ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default AccessControl;