import React, { useState, useRef, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useLoggedUser } from '../hooks/useLoggedUser';
import { Manager, Reference, Popper } from 'react-popper';

function ClickablePopper() {
  const node = useRef();
  const [isOpen, setIsOpen] = useState(false);

  function handleClick(e) {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setIsOpen(false);
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  function render() {
    return (
      <div ref={node}>
        <Manager>
          <Reference>
            {({ ref }) => (
              <button
                type="button"
                ref={ref}
                className="p-2 bg-red-400"
                onClick={() => setIsOpen(!isOpen)}
              >
                Reference element
              </button>
            )}
          </Reference>
          {isOpen && (
            <Popper
              placement="bottom"
              modifiers={{
                offset: {
                  offset: '0, 20'
                },
                preventOverflow: {
                  boundariesElement: 'viewport'
                }
              }}
            >
              {({ ref, style, placement, arrowProps }) => (
                <div ref={ref} style={style} data-placement={placement}>
                  <div
                    ref={arrowProps.ref}
                    style={{
                      ...arrowProps.style,
                      position: 'absolute',
                      borderLeftColor: 'transparent',
                      borderRightColor: 'transparent',
                      borderStyle: 'solid',
                      borderWidth: '0px 14px 14px',
                      top: '-14px'
                    }}
                    className="border-green-600"
                    data-placement={placement}
                  />
                  <div className="p-2 bg-green-600">
                    <div>Popper element element element </div>
                    <div>Popper element</div>
                    <div>Popper element</div>
                    <div>Popper element</div>
                  </div>
                </div>
              )}
            </Popper>
          )}
        </Manager>
      </div>
    );
  }

  return render();
}

const Header = ({ location }) => {
  const loggedUser = useLoggedUser();
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
          <button className="btn btn-secondary focus:outline-none font-medium hover:bg-gray-600 px-2 py-1 rounded">
            Home
          </button>
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
    <header className="bg-dark bg-gray-700 p-1 p-2 shadow-md">
      <div className="header-container">
        {homeLink()}
        <div className="space-grow" />
        <div className="header-container-right">
          {loginLink()}
          {registerLink()}
          {dashboardLink()}
          <ClickablePopper />
        </div>
      </div>
    </header>
  );
};

export default withRouter(Header);
