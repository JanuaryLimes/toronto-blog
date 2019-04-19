import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, logout } from '../actions';
import { getLoggedUser } from '../selectors/auth.selector';
import axios from 'axios';
import Input from '../components/Input';
import Alert from '../components/Alert';
import { useCookies } from 'react-cookie';
import { isUsernameValid } from 'toronto-utils/lib/validation';

const LoginRegisterPage = ({
  location,
  dispatchLogin,
  dispatchLogout,
  history
}) => {
  const { pathname } = location;
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [canLogin, setCanLogin] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertProps, setAlertProps] = useState({});
  const [repeatPassword, setRepeatPassword] = useState('');
  const [canRegister, setCanRegister] = useState(false);

  const cookies = useCookies();

  useEffect(() => {
    if (pathname === '/logout') {
      console.log('logout');
      cookies[2]('jwt');
      cookies[2]('u');
      dispatchLogout();
      history.push('/');
    }

    if (pathname === '/login') {
      setIsLoginPage(true);
    } else {
      setIsLoginPage(false);
    }
  }, [pathname]);

  useEffect(() => {
    const canRegisterVal =
      isUsernameValid(username).valid && passwordPolicyPassed();
    setCanRegister(canRegisterVal);
  }, [username, password, repeatPassword]);

  useEffect(() => {
    const canRegisterVal = username !== '' && password !== '';
    setCanLogin(canRegisterVal);
  }, [username, password]);

  const passwordPolicyPassed = () => {
    if (password === repeatPassword && password !== '') {
      return true;
    } else {
      return false;
    }
  };

  const getValidationStatus = () => {
    if (repeatPassword === '') {
      return '';
    }

    if (password === repeatPassword) {
      return 'is-valid';
    } else {
      return 'is-invalid';
    }
  };

  const canClick = () => {
    if (isLoginPage) {
      return canLogin;
    } else {
      return canRegister;
    }
  };

  const postArgs = () => {
    if (isLoginPage) {
      return ['/api/login', { username, password }, { withCredentials: true }];
    } else {
      return [
        '/api/register',
        {
          username,
          password
        }
      ];
    }
  };

  const clearInputs = () => {
    setUsername('');
    setPassword('');
    setRepeatPassword('');
  };

  const successText = user => {
    if (isLoginPage) {
      return 'Logged in as: ' + user;
    } else {
      return `User '${user}' successfully registered`;
    }
  };

  const onSuccess = user => {
    clearInputs();
    dispatchLogin(user);
    setAlertVisible(true);
    setAlertProps({
      text: successText(user),
      type: 'alert-success',
      onClose: () => setAlertVisible(false)
    });
  };

  const errorText = error => {
    console.log('todo error', error);

    if (isLoginPage) {
      return 'Wrong username or password';
    } else {
      return 'Unable to register: <todo: fail status>';
    }
  };

  const onError = error => {
    setAlertVisible(true);
    setAlertProps({
      text: errorText(error),
      type: 'alert-danger',
      onClose: () => setAlertVisible(false)
    });
  };

  const onClickHandler = e => {
    e.preventDefault();

    if (canClick()) {
      setIsLoading(true);
      axios
        .post(...postArgs())
        .then(response => {
          onSuccess(response.data.user);
        })
        .catch(error => {
          onError(error);
        })
        .then(() => {
          setIsLoading(false);
        });
    }
  };

  const usernameProps = {
    caption: 'Username',
    value: username,
    onChange: setUsername
  };
  const passwordProps = {
    caption: 'Password',
    value: password,
    onChange: setPassword,
    type: 'password'
  };
  const repeatPasswordProps = {
    caption: 'Repeat password',
    value: repeatPassword,
    onChange: setRepeatPassword,
    type: 'password',
    validationStatus: getValidationStatus()
  };

  return pathname === '/logout' ? (
    <div />
  ) : (
    <div className="register-page">
      <div className="register-form card bg-dark">
        <div className="register-from-content">
          <form>
            <Input {...usernameProps} />
            <Input {...passwordProps} />
            {!isLoginPage && <Input {...repeatPasswordProps} />}
            {alertVisible && <Alert {...alertProps} />}
            <button
              className="btn btn-success"
              type="submit"
              disabled={isLoginPage ? !canLogin : !canRegister}
              onClick={onClickHandler}
            >
              {isLoginPage ? 'Login' : 'Register'}
            </button>
          </form>
          {isLoading && (
            <div className="loader">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  loggedUser: getLoggedUser(state)
});

const mapDispatchToProps = dispatch => ({
  dispatchLogin: loggedUser => {
    dispatch(login({ loggedUser }));
  },
  dispatchLogout: () => {
    dispatch(logout());
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginRegisterPage)
);
