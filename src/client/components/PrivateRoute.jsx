import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useLoggedUser } from '../hooks/useLoggedUser';
import { useCookies } from 'react-cookie';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const loggedUser = useLoggedUser();
  const cookies = useCookies();

  return (
    <Route
      {...rest}
      render={props => {
        if (loggedUser || cookies[0].u) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          );
        }
      }}
    />
  );
};

export default PrivateRoute;
