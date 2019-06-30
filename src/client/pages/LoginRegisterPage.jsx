import React, { useState, useEffect, useCallback } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, logout } from '../actions';
import { useCookies } from 'react-cookie';
import { isUsernameValid, isPasswordValid } from 'toronto-utils/lib/validation';
import axios from 'axios';
import Input from '../components/Input';
import Alert from '../components/Alert';
import lodash from 'lodash';
import { BouncingLoader, DonutSpinnerLoader } from '../components/Loaders';
import { FadeInOut, PosedLi, OpacityModifier } from '../components/Posed';
import { PoseGroup } from 'react-pose';
import { useMeasure } from '../hooks/useMeasure';

let debounceCheck;

export const LogoutComponent = () => {
  const dispatch = useDispatch();
  const dispatchLogout = useCallback(() => dispatch(logout()), [dispatch]);
  const cookies = useCookies();

  const handleLogout = () => {
    console.log('logout');
    cookies[2]('jwt');
    cookies[2]('u');
    dispatchLogout();

    return <Redirect to="/" />;
  };

  function render() {
    return handleLogout();
  }

  return render();
};

const LoginRegisterPage = ({ location }) => {
  const dispatch = useDispatch();
  const dispatchLogin = useCallback(
    loggedUser => dispatch(login({ loggedUser })),
    [dispatch]
  );

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

  useEffect(() => {
    if (pathname === '/login') {
      setIsLoginPage(true);
    } else {
      setIsLoginPage(false);
    }
  }, [pathname]);

  const passwordPolicyPassed = useCallback(() => {
    console.log('passwordPolicyPassed');
    if (
      password === repeatPassword &&
      password !== '' &&
      (passwordStrengthCheck && passwordStrengthCheck.valid)
    ) {
      return true;
    } else {
      return false;
    }
  }, [password, repeatPassword, passwordStrengthCheck]);

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
    passwordStrengthCheck,
    passwordPolicyPassed
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
  }, [isLoginPage, password]);

  const checkPasswordStrength = () => {
    if (!passwordStrengthCheck) {
      return null;
    }

    if (passwordStrengthCheck.valid) {
      return null;
    } else {
      return (
        <div className="invalid-feedback text-sm bg-red-700 mt-1 px-2 py-1 rounded">
          <ul className="list-disc m-0 mt-1 pl-2 pl-4 ">
            <PoseGroup>
              {passwordStrengthCheck.msg.map(m => (
                <PosedLi key={m}>{m}</PosedLi>
              ))}
            </PoseGroup>
          </ul>
        </div>
      );
    }
  };

  const debounceCallback = username => {
    console.log('before axios', username);
    axios
      .get('/api/auth/is-user-available?user=' + username)
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

  const [div1, { height: viewHeight1 }] = useMeasure();
  const [div2, { height: viewHeight2 }] = useMeasure();
  const [div3, { height: viewHeight3 }] = useMeasure();

  const [relativeInfoMaxHeight, setRelativeInfoMaxHeight] = useState(0);

  useEffect(() => {
    let maxHeight = Math.max(viewHeight1, viewHeight2, viewHeight3);
    setRelativeInfoMaxHeight(maxHeight);
  }, [viewHeight1, viewHeight2, viewHeight3]);

  const checkUsernameAvailability = () => {
    var checkingAvailability = false,
      usernameStatusAvailable = false,
      usernameStatusNotAvailable = false,
      show = true;

    if (!(isLoginPage || username === '')) {
      if (usernameIsChecking) {
        checkingAvailability = true;
      } else {
        if (usernameIsAvailable) {
          usernameStatusAvailable = true;
        } else {
          usernameStatusNotAvailable = true;
        }
      }
    } else {
      show = false;
    }

    return (
      <FadeInOut condition={show}>
        <div className="relative" style={{ height: relativeInfoMaxHeight }}>
          <div className="absolute inset-0">
            <OpacityModifier condition={checkingAvailability}>
              <div {...div1}>
                <div className="pt-1">
                  <div className="inline-flex">
                    <DonutSpinnerLoader />
                  </div>
                  <span className="inline ml-1">checking availability</span>
                </div>
              </div>
            </OpacityModifier>
          </div>
          <div className="absolute inset-0">
            <OpacityModifier condition={usernameStatusAvailable}>
              <div {...div2}>
                <div className="pt-1">
                  <div className="px-2 rounded valid-feedback text-sm bg-green-700 truncate">
                    {username} is available
                  </div>
                </div>
              </div>
            </OpacityModifier>
          </div>
          <div className="absolute inset-0">
            <OpacityModifier condition={usernameStatusNotAvailable}>
              <div {...div3}>
                <div className="pt-1">
                  <div className="px-2 rounded invalid-feedback text-sm bg-red-700 truncate">
                    {username} is not available
                  </div>
                </div>
              </div>
            </OpacityModifier>
          </div>
        </div>
      </FadeInOut>
    );
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
    var result = { className: '', showRepeatPasswordErrorMessage: false };

    if (repeatPassword === '') {
      return result;
    } else {
      if (password === repeatPassword) {
        result.className = 'is-valid';
      } else {
        result.showRepeatPasswordErrorMessage = true;
        result.className = 'is-invalid';
      }
    }

    return result;
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
      return [
        '/api/auth/login',
        { username, password },
        { withCredentials: true }
      ];
    } else {
      return [
        '/api/auth/register',
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
    validationStatus: getRepeatPasswordValidationStatus().className
  };

  function getAlert() {
    return (
      <FadeInOut pose={alertVisible ? 'in' : 'out'}>
        <Alert {...alertProps} />
      </FadeInOut>
    );
  }

  function getRepeatPasswordSection() {
    if (isLoginPage) {
      return '';
    }

    return (
      <>
        <Input {...repeatPasswordProps} />
        <FadeInOut
          condition={
            getRepeatPasswordValidationStatus().showRepeatPasswordErrorMessage
          }
        >
          <div className="pt-1">
            <div className="px-2 rounded invalid-feedback text-sm bg-red-700 truncate">
              Passwords do not match
            </div>
          </div>
        </FadeInOut>
      </>
    );
  }

  function render() {
    return (
      <div className="px-4 py-12 ">
        <div className="bg-gray-700 m-auto max-w-sm rounded">
          <div className="relative">
            <form className="px-4 py-2 shadow-lg">
              <Input {...usernameProps} />
              {checkUsernameAvailability()}
              <Input {...passwordProps} />
              {checkPasswordStrength()}
              {getRepeatPasswordSection()}
              {getAlert()}
              <button
                className="bg-green-700 hover:bg-green-600 my-2 px-2 px-4 py-1 rounded shadow"
                type="submit"
                disabled={isLoginPage ? !canLogin : !canRegister}
                onClick={onClickHandler}
              >
                {isLoginPage ? 'Login' : 'Register'}
              </button>
            </form>
            {isLoading && <BouncingLoader />}
          </div>
        </div>
      </div>
    );
  }

  return render();
};

export default withRouter(LoginRegisterPage);
