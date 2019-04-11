import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Input from '../components/Input';
import axios from 'axios';

const RegisterPage = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [canRegister, setCanRegister] = useState(false);

  useEffect(() => {
    const canRegisterVal = usernameIsValid() && passwordPolicyPassed();
    setCanRegister(canRegisterVal);
  }, [username, password, repeatPassword]);

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
  const onCreate = e => {
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
        })
        .catch(error => {
          console.log('error', error, error.response.data);
        })
        .then(() => {
          setIsLoading(false);
        });
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

  return (
    <div className="register-page">
      <div className="home-link">
        <Link to="/">
          <button className="btn btn-secondary">Home</button>
        </Link>
      </div>
      <div className="register-form card bg-dark">
        <div className="register-from-content">
          <form>
            <Input {...usernameProps} />
            <Input {...passwordProps} />
            <Input {...repeatPasswordProps} />
            <button
              className="btn btn-success"
              type="submit"
              disabled={!canRegister}
              onClick={onCreate}
            >
              Register
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

export default withRouter(RegisterPage);
