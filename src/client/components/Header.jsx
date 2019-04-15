import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLoggedUser } from '../selectors/auth.selector';

const Header = ({ location, loggedUser }) => {
  const { pathname } = location;

  const loginRegisterVisible = () => {
    if (pathname === '/') {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    console.log('path', pathname);
  }, [loggedUser]);

  const getLoginLogout = () => {
    if (loggedUser) {
      return (
        <Link to="/logout">
          <button className="btn btn-primary">Log out</button>
        </Link>
      );
    } else {
      return (
        <Link to="/login">
          <button className="btn btn-primary">Log in</button>
        </Link>
      );
    }
  };

  return (
    <header className="bg-dark">
      <div className="header-container">
        <Link to="/">
          <button className="btn btn-secondary">Home</button>
        </Link>
        <div className="space-grow" />
        <div>
          {loginRegisterVisible() && (
            <span>
              {getLoginLogout()}{' '}
              {!loggedUser && (
                <Link to="/register">
                  <button className="btn btn-info">Register</button>
                </Link>
              )}
            </span>
          )}
          {loggedUser && <span>{loggedUser}</span>}
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = state => ({
  loggedUser: getLoggedUser(state)
});

export default withRouter(connect(mapStateToProps)(Header));
