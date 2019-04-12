import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Input from '../components/Input';
import axios from 'axios';
import { connect } from 'react-redux';
import { getLoggedUser } from '../selectors/auth.selector';
import { login } from '../actions';

const LoginPage = ({ dispatchLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [canLogin, setCanLogin] = useState(false);

  useEffect(() => {
    const canRegisterVal = username !== '' && password !== '';
    setCanLogin(canRegisterVal);
  }, [username, password]);

  const onLogin = e => {
    e.preventDefault();

    if (canLogin) {
      setIsLoading(true);
      axios
        .post('/api/login', { username, password }, { withCredentials: true })
        .then(response => {
          console.log('logged', response);
          setUsername('');
          setPassword('');
          dispatchLogin(response.data.user);
        })
        .catch(error => {
          console.log('error', error, error.response.data);
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

  return (
    <div className="register-page">
      <div className="register-form card bg-dark">
        <div className="register-from-content">
          <form>
            <Input {...usernameProps} />
            <Input {...passwordProps} />
            <button
              className="btn btn-success"
              type="submit"
              disabled={!canLogin}
              onClick={onLogin}
            >
              Login
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
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginPage)
);
