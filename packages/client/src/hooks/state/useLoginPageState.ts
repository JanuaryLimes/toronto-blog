import { useDispatch } from 'react-redux';
import { useCallback, useState, useEffect } from 'react';
import { login } from '../../actions';
import { useSuccessErrorAlert } from '../../components/Alert';
import { RestCallWithBodyProps, InputControlProps } from '../../types';
import { usePost } from '../useAxios';

export function useLoginPageState() {
  const dispatch = useDispatch();
  const dispatchLogin = useCallback(
    loggedUser =>
      dispatch(
        login({
          loggedUser
        })
      ),
    [dispatch]
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [canLogin, setCanLogin] = useState(false);
  const {
    showSuccessAlert,
    showErrorAlert,
    renderAlertsContainer
  } = useSuccessErrorAlert();
  useEffect(() => {
    const canRegisterVal = username !== '' && password !== '';
    setCanLogin(canRegisterVal);
  }, [username, password]);

  const canClick = () => {
    return canLogin;
  };

  const clearInputs = () => {
    setUsername('');
    setPassword('');
  };

  const successText = (user: string) => {
    return 'Logged in as: ' + user;
  };

  const onSuccess = (user: string) => {
    clearInputs();
    dispatchLogin(user);
    showSuccessAlert(successText(user));
  };

  const errorText = (_error: any) => {
    // TODO display error
    return 'Wrong username or password';
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
        path: '/api/auth/login',
        body: {
          username,
          password
        },
        config: {
          withCredentials: true
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
    onChange: (val: string) => setUsername(val.trim())
  };
  const passwordProps: InputControlProps = {
    caption: 'Password',
    value: password,
    onChange: setPassword,
    type: 'password'
  };

  return {
    renderAlertsContainer,
    isLoading,
    usernameProps,
    passwordProps,
    canLogin,
    onClickHandler
  };
}
