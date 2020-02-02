import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../actions';
import { isUsernameValid, isPasswordValid } from '@toronto-blog/utils';
import axios from 'axios';
import { useSuccessErrorAlert } from '../../components/Alert';
import lodash from 'lodash';
import { usePost } from '../useAxios';
import { InputControlProps, RestCallWithBodyProps } from '../../types';

let debounceCheck: (((username: string) => void) & lodash.Cancelable) | null;

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
    return () => {
      console.log('componentWillUnmount');
      if (debounceCheck) {
        debounceCheck.cancel();
      }
      debounceCheck = null;
    };
  }, []);

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
