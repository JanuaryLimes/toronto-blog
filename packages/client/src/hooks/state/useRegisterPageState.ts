import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../actions';
import { isUsernameValid, isPasswordValid } from '@toronto-blog/utils';
import { useSuccessErrorAlert } from '../../components/Alert';
import { debounce, Cancelable } from 'lodash';
import { usePost, useGet } from '../useAxios';
import {
  InputControlProps,
  RestCallWithBodyProps,
  RestCallProps
} from '../../types';
import moment from 'moment';

type DebounceCallback = (username: string) => void;
type DebounceCheck = (DebounceCallback & Cancelable) | null;

export function getTime() {
  return moment(new Date()).format('HH:mm:ss.SSS');
}

// TODO feedback

export function useRegisterPageState() {
  const dispatch = useDispatch();
  const dispatchLogin = useCallback(
    loggedUser => dispatch(login({ loggedUser })),
    [dispatch]
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

  const passwordPolicyPassed = useCallback(() => {
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
    if (!password) {
      setPasswordStrengthCheck(undefined);
      return;
    }
    setPasswordStrengthCheck(isPasswordValid(password));
  }, [password]);

  const getPasswordValidationStatus = () => {
    if (!passwordStrengthCheck) {
      return '';
    }
    if (passwordStrengthCheck.valid) {
      return 'is-valid';
    } else {
      return 'is-invalid';
    }
  };

  const getUsernameValidationStatus = () => {
    if (!username || usernameIsChecking || usernameIsAvailable === undefined) {
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
    return canRegister;
  };

  const clearInputs = () => {
    setUsername('');
    setPassword('');
    setRepeatPassword('');
  };

  const successText = (user: string) => {
    return `User '${user}' successfully registered`;
  };

  const onSuccess = (user: string) => {
    clearInputs();
    dispatchLogin(user);
    showSuccessAlert(successText(user));
  };

  const errorText = (error: {
    response: {
      data: {
        pCheck: any;
      };
    };
  }) => {
    if (error.response && error.response.data && error.response.data.pCheck) {
      const passwordCheck = error.response.data.pCheck;
      setPasswordStrengthCheck(passwordCheck);
    }
    return 'Registration failed';
  };

  const onError = (error: {
    response: {
      data: {
        pCheck: any;
      };
    };
  }) => {
    showErrorAlert(errorText(error));
  };

  const [postArgs, setPostArgs] = useState<RestCallWithBodyProps>({});
  const { isLoading } = usePost(postArgs);

  const onClickHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (canClick()) {
      setPostArgs({
        path: '/api/auth/register',
        body: {
          username,
          password
        },
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
    validationStatus: getUsernameValidationStatus(),
    className: 'username-input'
  };

  const passwordProps: InputControlProps = {
    caption: 'Password',
    value: password,
    onChange: setPassword,
    type: 'password',
    validationStatus: getPasswordValidationStatus(),
    className: 'password-input'
  };

  const repeatPasswordProps: InputControlProps = {
    caption: 'Repeat password',
    value: repeatPassword,
    onChange: setRepeatPassword,
    type: 'password',
    validationStatus: getRepeatPasswordValidationStatus().className,
    className: 'repeat-password-input'
  };

  function onFinally() {
    setUsernameIsChecking(false);
  }

  const [isUserAvailableProps, setIsUserAvailableProps] = useState<
    RestCallProps
  >({});
  /*const {}=*/ useGet(isUserAvailableProps);

  const debounceCallback = useCallback<DebounceCallback>((username: string) => {
    // console.warn('setIsUserAvailableProps: ', { username, time: getTime() });
    setIsUserAvailableProps({
      path: '/api/auth/is-user-available?user=' + username,
      onSuccess: data => {
        const { usernameAvailable } = data;
        if (usernameAvailable) {
          console.log('username check', true);
          setUsernameIsAvailable(true);
        } else {
          console.log('username check', false);
          setUsernameIsAvailable(false);
        }
        onFinally();
      },
      onError: error => {
        setUsernameIsAvailable(false);
        console.log('error checking username', error);
        onFinally();
      }
    });
  }, []);

  useEffect(() => {
    // console.warn('useEffect', { username, time: getTime() });
    let check: DebounceCheck = null;

    if (username !== '') {
      setUsernameIsChecking(true);
      check = debounce(debounceCallback, 1000);
      check(username);
    } else {
      setUsernameIsAvailable(false);
    }

    return function cleanup() {
      // console.warn('useEffect cleanup', { username });
      check?.cancel();
    };
  }, [debounceCallback, username]);

  return {
    isLoading,
    usernameProps,
    passwordProps,
    renderAlertsContainer,
    canRegister,
    onClickHandler,
    repeatPasswordProps,
    getRepeatPasswordValidationStatus,
    username,
    usernameIsChecking,
    usernameIsAvailable,
    passwordStrengthCheck
  };
}
