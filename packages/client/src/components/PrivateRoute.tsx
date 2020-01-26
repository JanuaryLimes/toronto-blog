import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useLoggedUser } from '../hooks/useLoggedUser';
import { useCookies } from 'react-cookie';

export const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const loggedUser = useLoggedUser();
  const cookies = useCookies(); // TODO

  return (
    <Route
      {...rest}
      render={props => {
        if (Component != null && (loggedUser || cookies[0].u)) {
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
