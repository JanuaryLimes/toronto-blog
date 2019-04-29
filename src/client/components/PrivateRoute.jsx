import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LoggedUser } from '../hooks/loggedUser';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const loggedUser = LoggedUser();

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
