import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { LoggedUser } from '../hooks/loggedUser';

const Header = ({ location }) => {
  const loggedUser = LoggedUser();
  const { pathname } = location;

  const loginRegisterVisible = () => {
    if (pathname === '/') {
      return true;
    } else {
      return false;
    }
  };

  const homeLink = () => {
    return (
      <span className="link">
        <Link to="/">
          <button className="btn btn-secondary">Home</button>
        </Link>
      </span>
    );
  };

  const loginLink = () => {
    if (loginRegisterVisible() && !loggedUser) {
      return (
        <span className="link">
          <Link to="/login">
            <button className="btn btn-primary">Log in</button>
          </Link>
        </span>
      );
    }
    return '';
  };

  const registerLink = () => {
    if (loginRegisterVisible() && !loggedUser) {
      return (
        <span className="link">
          <Link to="/register">
            <button className="btn btn-info">Register</button>
          </Link>
        </span>
      );
    }

    return '';
  };

  const dashboardLink = () => {
    if (loggedUser) {
      return (
        <div className="dashboard-dropdown">
          <span className="link">
            <i className="fas fa-user" />
          </span>
          <div className="dashboard-dropdown-content bg-dark">
            <div className="item no-hover">Logged as: {loggedUser}</div>
            {pathname !== '/dashboard' && (
              <Link to="/dashboard">
                <div className="item">Dashboard</div>
              </Link>
            )}
            <Link to="/logout">
              <div className="item">Logout</div>
            </Link>
          </div>
        </div>
      );
    }

    return '';
  };

  return (
    <header className="bg-dark">
      <div className="header-container">
        {homeLink()}
        <div className="space-grow" />
        <div className="header-container-right">
          {loginLink()}
          {registerLink()}
          {dashboardLink()}
        </div>
      </div>
    </header>
  );
};

export default withRouter(Header);
