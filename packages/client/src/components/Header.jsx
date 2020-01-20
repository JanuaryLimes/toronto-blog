import React, { useState, useRef, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useLoggedUser } from '../hooks/useLoggedUser';
import Tippy from '@tippy.js/react';
import { getColorFromClassName } from '../utils';
import { roundArrow } from 'tippy.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const TorontoTippy = withRouter(
  ({ location, appendTarget, tooltipColor = 'bg-gray-800' }) => {
    const { pathname } = location;
    const loggedUser = useLoggedUser();
    const [ariaExpanded, setAriaExpanded] = useState('false');
    const tippyInstance = useRef();

    useEffect(() => {
      const color = getColorFromClassName(tooltipColor);
      document.documentElement.style.setProperty('--toronto-color', color);
    }, [tooltipColor]);

    function hideTippy() {
      tippyInstance.current.hide();
    }

    function getItem(linkTo, text) {
      return (
        <li onClick={hideTippy} className="text-left">
          <Link to={linkTo}>
            <div className="py-1 px-2 pr-3 text-base rounded hover:bg-gray-700">
              {text}
            </div>
          </Link>
        </li>
      );
    }

    function render() {
      const yourBlogUrl = '/blog/' + loggedUser;

      return (
        <Tippy
          content={
            <ul className="p-1">
              {pathname !== yourBlogUrl &&
                getItem(yourBlogUrl, 'Go to your blog')}
              {pathname !== '/dashboard' && getItem('/dashboard', 'Dashboard')}
              {getItem('/logout', 'Logout')}
            </ul>
          }
          onCreate={instance => (tippyInstance.current = instance)}
          placement="bottom"
          trigger="click"
          animation="scale"
          aria={null}
          theme="toronto"
          appendTo={() => appendTarget.current}
          arrow={roundArrow}
          inertia={true}
          interactive={true}
          duration={[300, 120]}
          onMount={() => setAriaExpanded('true')}
          onHide={() => setAriaExpanded('false')}
        >
          <button
            aria-expanded={ariaExpanded}
            className="hover:bg-gray-800 px-2 py-1 relative rounded"
          >
            <span>
              <FontAwesomeIcon icon={faUser} />
              {' ' + loggedUser}
            </span>
          </button>
        </Tippy>
      );
    }

    return render();
  }
);

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
          <button
            className="focus:outline-none 
            font-medium hover:bg-gray-800 
            px-2 py-1 rounded"
          >
            Home
          </button>
        </Link>
      </span>
    );
  };

  function getLink(linkTo, buttonText) {
    return (
      <span className="flex items-center ml-2">
        <Link to={linkTo}>
          <button className="bg-purple-700 hover:bg-purple-800 px-2 py-1 rounded">
            {buttonText}
          </button>
        </Link>
      </span>
    );
  }

  const loginLink = () => {
    if (loginRegisterVisible() && !loggedUser) {
      return getLink('/login', 'Log in');
    }
    return '';
  };

  const registerLink = () => {
    if (loginRegisterVisible() && !loggedUser) {
      return getLink('/register', 'Register');
    }

    return '';
  };

  const dashboardLink = () => {
    if (loggedUser) {
      return <TorontoTippy appendTarget={header} />;
    }

    return '';
  };

  const header = useRef();

  return (
    <header
      ref={header}
      className="p-2 shadow-md"
      style={{ background: 'rgb(21, 21, 21)' }}
    >
      <div className="flex flex-wrap">
        {homeLink()}
        <div className="flex-auto" />
        <div className="flex">
          {loginLink()}
          {registerLink()}
          {dashboardLink()}
        </div>
      </div>
    </header>
  );
};

export default withRouter(Header);
