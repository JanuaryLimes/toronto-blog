import React, { useState, useRef, forwardRef, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useLoggedUser } from '../hooks/useLoggedUser';
import Tippy from '@tippy.js/react';

function TorontoTippy({
  buttonContent,
  children,
  tooltipColor = 'bg-gray-700'
}) {
  const [ariaExpanded, setAriaExpanded] = useState('false');
  // const [selectedReaction, setSelectedReaction] = useState(null);
  const tippyInstance = useRef();

  useEffect(() => {
    var dummy = document.createElement('div');
    dummy.classList.add(tooltipColor);
    document.body.appendChild(dummy);
    var color = getComputedStyle(dummy, null).getPropertyValue(
      'background-color'
    );
    console.log('dummy set', color);
    document.body.removeChild(dummy);
    document.documentElement.style.setProperty('--toronto-color', color);
  }, [tooltipColor]);

  function render() {
    return (
      <Tippy
        content={children.map((child, i) => (
          <div onClick={() => tippyInstance.current.hide()} key={i}>
            {child}
          </div>
        ))}
        onCreate={instance => (tippyInstance.current = instance)}
        placement="bottom"
        trigger="click"
        animation="scale"
        aria={null}
        theme="toronto"
        arrow={true}
        inertia={true}
        arrowType="round"
        interactive={true}
        duration={[300, 200]}
        onMount={() => setAriaExpanded('true')}
        onHide={() => setAriaExpanded('false')}
      >
        <button
          aria-expanded={ariaExpanded}
          className="bg-green-500 p-2 py-1 relative"
        >
          {buttonContent}
        </button>
      </Tippy>
    );
  }

  return render();
}

const ThisWillWork = forwardRef((props, ref) => {
  function render() {
    return (
      <button
        ref={ref}
        aria-expanded={props.ariaExpanded}
        className="bg-green-500 p-2 py-1 relative"
      >
        dupa dupa
        {/* <span><i className="fas fa-user" />dupa dupa</span> */}
      </button>
    );
  }

  return render();
});
// const Aaa = ({ tooltipColor = 'bg-gray-700' }) => {
//   const [ariaExpanded, setAriaExpanded] = useState('false');
//   const [selectedReaction, setSelectedReaction] = useState(null);
//   const tippyInstance = useRef();

//   useEffect(() => {
//     var dummy = document.createElement('div');
//     dummy.classList.add(tooltipColor);
//     document.body.appendChild(dummy);
//     var color = getComputedStyle(dummy, null).getPropertyValue(
//       'background-color'
//     );
//     console.log('dummy set', color);
//     document.body.removeChild(dummy);
//     document.documentElement.style.setProperty('--toronto-color', color);
//   }, [tooltipColor]);

//   return (
//     <div>
//       <span>
//         <Tippy
//           content={
//             <EmojiPicker
//               selectedReaction={selectedReaction}
//               onSelect={e => {
//                 setSelectedReaction(e);
//                 tippyInstance.current.hide();
//                 console.log(tippyInstance);
//               }}
//             />
//           }
//           onCreate={instance => (tippyInstance.current = instance)}
//           placement="bottom"
//           trigger="click"
//           animation="scale"
//           aria={null}
//           theme="toronto"
//           arrow={true}
//           inertia={true}
//           arrowType="round"
//           interactive={true}
//           duration={[300, 200]}
//           onMount={() => setAriaExpanded('true')}
//           onHide={() => setAriaExpanded('false')}
//         >
//           <ThisWillWork ariaExpanded={ariaExpanded} />

//           {/* <button
//             aria-expanded={ariaExpanded}
//             className="bg-green-500 p-2 py-1"
//           >
//             <span>
//               <i className="fas fa-user" />
//             </span>
//           </button> */}
//         </Tippy>
//       </span>
//     </div>
//   );
// };

// function ClickablePopper() {
//   return <Aaa />;
// }

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
    <header className="bg-dark bg-gray-700 p-2 shadow-md">
      <div className="header-container">
        {homeLink()}
        <div className="space-grow" />
        <div className="header-container-right">
          {loginLink()}
          {registerLink()}
          {dashboardLink()}
          {/* <ClickablePopper /> */}

          <TorontoTippy
            buttonContent={
              <span>
                <i className="fas fa-user" />
              </span>
            }
          >
            <div>hej</div>
            <div>hej</div>
            <div>hej</div>
          </TorontoTippy>
        </div>
      </div>
    </header>
  );
};

export default withRouter(Header);
