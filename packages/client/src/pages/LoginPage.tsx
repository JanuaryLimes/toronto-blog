import React from 'react';
import { Input } from '../components/Input';
import { LoadableDiv } from '../components/LoadableDiv';
import { useLoginPageState } from './../hooks/state/useLoginPageState';

// TODO feedback

export const LoginPage = () => {
  const {
    renderAlertsContainer,
    isLoading,
    usernameProps,
    passwordProps,
    canLogin,
    onClickHandler
  } = useLoginPageState();

  function render() {
    return (
      <div className="px-4 py-12 ">
        <div className="m-auto max-w-sm rounded">
          <LoadableDiv isLoading={isLoading}>
            <form className="px-4 py-2">
              <Input {...usernameProps} />
              <Input {...passwordProps} />
              <div className="pt-2">{renderAlertsContainer()}</div>
              <button
                className="login-button bg-green-700 hover:bg-green-600 my-2 px-2 px-4 py-1 rounded shadow"
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
