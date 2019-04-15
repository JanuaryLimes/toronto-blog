import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, logout } from '../actions';
import { getLoggedUser } from '../selectors/auth.selector';
import axios from 'axios';
import Input from '../components/Input';
import Alert from '../components/Alert';
import { useCookies } from 'react-cookie';

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

  const jwtCookie = useCookies(['jwt']);

  useEffect(() => {
    if (pathname === '/logout') {
      console.log('logout');
      jwtCookie[2]('jwt');
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
    const canRegisterVal = usernameIsValid() && passwordPolicyPassed();
    setCanRegister(canRegisterVal);
  }, [username, password, repeatPassword]);

  useEffect(() => {
    const canRegisterVal = username !== '' && password !== '';
    setCanLogin(canRegisterVal);
  }, [username, password]);

  const usernameIsValid = () => {
    if (username !== '') {
      return true;
    } else {
      return false;
    }
  };

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

  const onRegister = e => {
    e.preventDefault();

    if (canRegister) {
      setIsLoading(true);
      axios
        .post('/api/register', {
          username,
          password
        })
        .then(response => {
          console.log('registered', response);
          setUsername('');
          setPassword('');
          setRepeatPassword('');
          const user = response.data.user;
          dispatchLogin(user);
          setAlertVisible(true);
          setAlertProps({
            text: `User '${user}' successfully registered`,
            type: 'alert-success',
            onClose: () => setAlertVisible(false)
          });
        })
        .catch(error => {
          console.log('error', error);
          console.log('eeee', error.response.data);
          // todo register validation/error info etc.
          setAlertVisible(true);
          setAlertProps({
            text: 'Unable to register: <todo: fail status>',
            type: 'alert-danger',
            onClose: () => setAlertVisible(false)
          });
        })
        .then(() => {
          setIsLoading(false);
        });
    }
  };
  const onLogin = e => {
    e.preventDefault();

    if (canLogin) {
      setIsLoading(true);
      axios
        .post('/api/login', { username, password }, { withCredentials: true })
        .then(response => {
          console.log('logged');
          setUsername('');
          setPassword('');
          const user = response.data.user;
          dispatchLogin(user);
          setAlertVisible(true);
          setAlertProps({
            text: 'Logged in as: ' + user,
            type: 'alert-success',
            onClose: () => setAlertVisible(false)
          });
        })
        .catch(error => {
          console.log('error', error, error.response.data);
          setAlertVisible(true);
          setAlertProps({
            text: 'Wrong username or password',
            type: 'alert-danger',
            onClose: () => setAlertVisible(false)
          });
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
              onClick={isLoginPage ? onLogin : onRegister}
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
