import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthentication } from "../../features/authentication/authenticationSlice";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // getting authentication state from store
  const { user } = useSelector(selectAuthentication);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
