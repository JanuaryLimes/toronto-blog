import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useLoggedUser } from '../hooks/useLoggedUser';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const loggedUser = useLoggedUser();

  return (
    <Route
      {...rest}
      render={props =>
        loggedUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
