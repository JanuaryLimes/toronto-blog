import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../actions';
import { isUsernameValid, isPasswordValid } from '@toronto-blog/utils';
import axios from 'axios';
import { Input } from '../components/Input';
import { useSuccessErrorAlert } from '../components/Alert';
import lodash from 'lodash';
import { DonutSpinnerLoader } from '../components/Loaders';
import { useMeasure } from '../hooks/useMeasure';
import {
  FadeInOut,
  HeightModifier,
  OpacityModifier,
  AnimatePresence,
  motion
} from '../components/Animate';
import { LoadableDiv } from '../components/LoadableDiv';
import { usePost } from '../hooks/useAxios';
import { InputControlProps, RestCallWithBodyProps } from '../types';

let debounceCheck: (((username: string) => void) & lodash.Cancelable) | null;

// TODO feedback

export const LoginPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const dispatchLogin = useCallback(
    loggedUser => dispatch(login({ loggedUser })),
    [dispatch]
  );

  const { pathname } = location;
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [canLogin, setCanLogin] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState('');
  const [canRegister, setCanRegister] = useState<boolean>(false);
  const [usernameIsChecking, setUsernameIsChecking] = useState(false);
  const [usernameIsAvailable, setUsernameIsAvailable] = useState<boolean>(
    false
  );
  const [passwordStrengthCheck, setPasswordStrengthCheck] = useState();
  const {
    showSuccessAlert,
    showErrorAlert,
    renderAlertsContainer
  } = useSuccessErrorAlert();

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
      passwordStrengthCheck &&
      passwordStrengthCheck.valid
    ) {
      return true;
    } else {
      return false;
    }
  }, [password, repeatPassword, passwordStrengthCheck]);

  useEffect(() => {
    const canRegisterVal = !!(
      isUsernameValid(username).valid &&
      passwordPolicyPassed() &&
      usernameIsAvailable
    );
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
    let arr = [];

    if (!passwordStrengthCheck || passwordStrengthCheck.valid) {
      arr = [];
    } else {
      arr = passwordStrengthCheck.msg;
    }

    return (
      <FadeInOut condition={arr.length > 0}>
        <div className="invalid-feedback text-sm bg-red-700 mt-1 px-2 py-1 rounded">
          <ul className="list-disc m-0 mt-1 pl-2 pl-4 ">
            <AnimatePresence>
              {arr.map((m: any) => (
                <motion.li
                  transition={{ duration: 0.5, type: 'tween' }}
                  key={m}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                >
                  {m}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </FadeInOut>
    );
  };

  const debounceCallback = (username: string) => {
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
      setUsernameIsAvailable(false);
      if (debounceCheck) {
        debounceCheck.cancel();
      }
    }
  }, [username]);

  const [div1, { height: viewHeight1 }] = useMeasure<HTMLDivElement>();
  const [div2, { height: viewHeight2 }] = useMeasure<HTMLDivElement>();
  const [div3, { height: viewHeight3 }] = useMeasure<HTMLDivElement>();

  const checkUsernameAvailability = () => {
    let checkingAvailability = false,
      usernameStatusAvailable = false,
      usernameStatusNotAvailable = false,
      containerHeight = 0;

    if (!(isLoginPage || username === '')) {
      if (usernameIsChecking) {
        checkingAvailability = true;
        containerHeight = viewHeight1;
      } else {
        if (usernameIsAvailable) {
          usernameStatusAvailable = true;
          containerHeight = viewHeight2;
        } else {
          usernameStatusNotAvailable = true;
          containerHeight = viewHeight3;
        }
      }
    } else {
      containerHeight = 0;
    }

    return (
      <div className="overflow-hidden">
        <HeightModifier height={containerHeight}>
          <div className="relative">
            <div className="absolute inset-0 z-10">
              <OpacityModifier condition={checkingAvailability} duration={250}>
                <div {...div1}>
                  <div className="flex items-center py-1">
                    <div className="inline-flex">
                      <DonutSpinnerLoader />
                    </div>
                    <span className="inline ml-1">checking availability</span>
                  </div>
                </div>
              </OpacityModifier>
            </div>
            <div className="absolute inset-0">
              <OpacityModifier condition={usernameStatusAvailable} duration={1}>
                <div {...div2}>
                  <div className="py-1">
                    <div className="px-2 rounded valid-feedback  bg-green-700 break-all ">
                      {username} is available
                    </div>
                  </div>
                </div>
              </OpacityModifier>
            </div>
            <div className="absolute inset-0">
              <OpacityModifier
                condition={usernameStatusNotAvailable}
                duration={1}
              >
                <div {...div3}>
                  <div className="py-1">
                    <div className="px-2 rounded invalid-feedback  bg-red-700 break-all ">
                      {username} is not available
                    </div>
                  </div>
                </div>
              </OpacityModifier>
            </div>
          </div>
        </HeightModifier>
      </div>
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
      !username ||
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
    const result = { className: '', showRepeatPasswordErrorMessage: false };

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

  const getPostArgs = (): RestCallWithBodyProps => {
    if (isLoginPage) {
      return {
        path: '/api/auth/login',
        body: {
          username,
          password
        },
        config: { withCredentials: true }
      };
    } else {
      return {
        path: '/api/auth/register',
        body: {
          username,
          password
        }
      };
    }
  };

  const clearInputs = () => {
    setUsername('');
    setPassword('');
    setRepeatPassword('');
  };

  const successText = (user: string) => {
    if (isLoginPage) {
      return 'Logged in as: ' + user;
    } else {
      return `User '${user}' successfully registered`;
    }
  };

  const onSuccess = (user: string) => {
    clearInputs();
    dispatchLogin(user);
    showSuccessAlert(successText(user));
  };

  const errorText = (error: { response: { data: { pCheck: any } } }) => {
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

  const onError = (error: { response: { data: { pCheck: any } } }) => {
    showErrorAlert(errorText(error));
  };

  const [postArgs, setPostArgs] = useState<RestCallWithBodyProps>({});
  const { isLoading } = usePost(postArgs);

  const onClickHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (canClick()) {
      setPostArgs({
        ...getPostArgs(),
        onSuccess: data => {
          onSuccess(data.user);
        },
        onError: error => {
          onError(error);
        }
      });
    }
  };

  const usernameProps: InputControlProps = {
    caption: 'Username',
    value: username,
    onChange: (val: string) => setUsername(val.trim()),
    validationStatus: getUsernameValidationStatus()
  };
  const passwordProps: InputControlProps = {
    caption: 'Password',
    value: password,
    onChange: setPassword,
    type: 'password',
    validationStatus: getPasswordValidationStatus()
  };
  const repeatPasswordProps: InputControlProps = {
    caption: 'Repeat password',
    value: repeatPassword,
    onChange: setRepeatPassword,
    type: 'password',
    validationStatus: getRepeatPasswordValidationStatus().className
  };

  function getAlert() {
    return <div className="pt-2">{renderAlertsContainer()}</div>;
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
        <div className="m-auto max-w-sm rounded">
          <LoadableDiv isLoading={isLoading}>
            <form className="px-4 py-2">
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
          </LoadableDiv>
        </div>
      </div>
    );
  }

  return render();
};
