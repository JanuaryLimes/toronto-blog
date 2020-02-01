import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions';
import { Input } from '../components/Input';
import { useSuccessErrorAlert } from '../components/Alert';
import { LoadableDiv } from '../components/LoadableDiv';
import { usePost } from '../hooks/useAxios';
import { InputControlProps, RestCallWithBodyProps } from '../types';

// TODO feedback

export const LoginPage = () => {
  const dispatch = useDispatch();
  const dispatchLogin = useCallback(
    loggedUser => dispatch(login({ loggedUser })),
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

  const onError = (error: { response: { data: { pCheck: any } } }) => {
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
        config: { withCredentials: true },
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

  function getAlert() {
    return <div className="pt-2">{renderAlertsContainer()}</div>;
  }

  function render() {
    return (
      <div className="px-4 py-12 ">
        <div className="m-auto max-w-sm rounded">
          <LoadableDiv isLoading={isLoading}>
            <form className="px-4 py-2">
              <Input {...usernameProps} />
              <Input {...passwordProps} />
              {getAlert()}
              <button
                className="bg-green-700 hover:bg-green-600 my-2 px-2 px-4 py-1 rounded shadow"
                type="submit"
                disabled={!canLogin}
                onClick={onClickHandler}
              >
                Login
              </button>
            </form>
          </LoadableDiv>
        </div>
      </div>
    );
  }

  return render();
};
