import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useActions } from 'react-redux';
import { login, logout } from '../actions';
import axios from 'axios';
import Input from '../components/Input';
import Alert from '../components/Alert';
import { useCookies } from 'react-cookie';
import { isUsernameValid, isPasswordValid } from 'toronto-utils/lib/validation';
import lodash from 'lodash';

let debounceCheck;

const LoginRegisterPage = ({ location, history }) => {
  const dispatchLogout = useActions(() => logout());
  const dispatchLogin = useActions(loggedUser => login({ loggedUser }));
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
  const [usernameIsChecking, setUsernameIsChecking] = useState(false);
  const [usernameIsAvailable, setUsernameIsAvailable] = useState(undefined);
  const [passwordStrengthCheck, setPasswordStrengthCheck] = useState();
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
      isUsernameValid(username).valid &&
      passwordPolicyPassed() &&
      usernameIsAvailable;
    setCanRegister(canRegisterVal);
  }, [
    username,
    password,
    repeatPassword,
    usernameIsAvailable,
    passwordStrengthCheck
  ]);

  useEffect(() => {
    const canRegisterVal = username !== '' && password !== '';
    setCanLogin(canRegisterVal);
  }, [username, password]);

  useEffect(() => {
    return () => {
      console.log('componentWillUnmount');
      if (debounceCheck) {
        debounceCheck.cancel();
      }
      debounceCheck = null;
    };
  }, []);

  useEffect(() => {
    if (!password || isLoginPage) {
      setPasswordStrengthCheck(undefined);
      return;
    }
    setPasswordStrengthCheck(isPasswordValid(password));
  }, [password]);

  const checkPasswordStrength = () => {
    if (!passwordStrengthCheck) {
      return null;
    }

    if (passwordStrengthCheck.valid) {
      return null;
    } else {
      return (
        <div className="invalid-feedback">
          <ul>
            {passwordStrengthCheck.msg.map(m => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  const debounceCallback = username => {
    console.log('before axios', username);
    axios
      .get('/api/isUserAvailable?user=' + username)
      .then(response => {
        const { usernameAvailable } = response.data;
        if (usernameAvailable) {
          console.log('username check', true);
          setUsernameIsAvailable(true);
        } else {
          console.log('username check', false);
          setUsernameIsAvailable(false);
        }
      })
      .catch(error => {
        setUsernameIsAvailable(false);
        console.log('error checking username', error);
      })
      .then(() => {
        setUsernameIsChecking(false);
      });
  };

  useEffect(() => {
    if (username !== '') {
      setUsernameIsChecking(true);
      if (debounceCheck) {
        debounceCheck(username);
      } else {
        debounceCheck = lodash.debounce(debounceCallback, 1000);
        debounceCheck(username);
      }
    } else {
      setUsernameIsAvailable(undefined);
      if (debounceCheck) {
        debounceCheck.cancel();
      }
    }
  }, [username]);

  const checkUsernameAvailability = () => {
    if (isLoginPage || username === '') {
      return null;
    }

    if (usernameIsChecking) {
      return (
        <div className="check-username">
          <div className="spinner-container">
            <div className="spinner-border" role="status" />
          </div>
          <span className="feedback">checking availability</span>
        </div>
      );
    } else {
      if (usernameIsAvailable) {
        return <div className="valid-feedback">{username} is available</div>;
      } else {
        return (
          <div className="invalid-feedback">{username} is not available</div>
        );
      }
    }
  };

  const passwordPolicyPassed = () => {
    if (
      password === repeatPassword &&
      password !== '' &&
      (passwordStrengthCheck && passwordStrengthCheck.valid)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const getPasswordValidationStatus = () => {
    if (isLoginPage || !passwordStrengthCheck) {
      return '';
    }

    if (passwordStrengthCheck.valid) {
      return 'is-valid';
    } else {
      return 'is-invalid';
    }
  };
  const getUsernameValidationStatus = () => {
    if (
      isLoginPage ||
      usernameIsChecking ||
      usernameIsAvailable === undefined
    ) {
      return '';
    }

    if (usernameIsAvailable) {
      return 'is-valid';
    } else {
      return 'is-invalid';
    }
  };

  const getRepeatPasswordValidationStatus = () => {
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
    if (error.response && error.response.data && error.response.data.pCheck) {
      const passwordCheck = error.response.data.pCheck;
      setPasswordStrengthCheck(passwordCheck);
    }

    if (isLoginPage) {
      return 'Wrong username or password';
    } else {
      return 'Registration failed';
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
    onChange: val => setUsername(val.trim()),
    validationStatus: getUsernameValidationStatus()
  };
  const passwordProps = {
    caption: 'Password',
    value: password,
    onChange: setPassword,
    type: 'password',
    validationStatus: getPasswordValidationStatus()
  };
  const repeatPasswordProps = {
    caption: 'Repeat password',
    value: repeatPassword,
    onChange: setRepeatPassword,
    type: 'password',
    validationStatus: getRepeatPasswordValidationStatus()
  };

  return pathname === '/logout' ? (
    <div />
  ) : (
    <div className="register-page">
      <div className="register-form card bg-dark">
        <div className="register-from-content">
          <form>
            <Input {...usernameProps} />
            {checkUsernameAvailability()}
            <Input {...passwordProps} />
            {checkPasswordStrength()}
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

export default withRouter(LoginRegisterPage);
