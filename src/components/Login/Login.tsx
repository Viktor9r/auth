import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { login } from '../../api';
import { Header } from '../Header/Header';
import '../Registration/Registration.scss';
import './Login.scss';
import classnames from 'classnames';

export const Login: React.FC = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [inputType, setInputType] = useState('password');
  const [loading, setLoading] = useState(false);

  const clearForm = () => {
    setUserName('');
    setPassword('');
  };

  const navigation = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    const response = await login(username, password);

    if (!response.ok) {
      setLoginError(true);
      setLoading(false);
      clearForm();
    } else {
      setLoginError(false);
      clearForm();
      navigation('/home', { replace: true });
    }
  };

  const showPassword = () => {
    setInputType('text');
  };

  const hidePassword = () => {
    setInputType('password');
  };

  return (
    <div className="login container">
      <Header />
      <form
        method="post"
        className="form login__form"
        onSubmit={handleSubmit}
      >
        <div className="form__title">Sign In</div>

        <div className="form__input">
          <label
            className="form__input-title"
            htmlFor="username"
          >
            User Name
          </label>
          <input
            id="username"
            type="text"
            className="form__input-field"
            placeholder="Example123"
            name="username"
            value={username}
            onChange={event => setUserName(event.target.value)}
            required
          />
        </div>

        <div className="form__input">
          <label
            className="form__input-title"
            htmlFor="password"
          >
            Password
          </label>
          <div className="form__input-block">
            <input
              id="password"
              type={inputType}
              className="form__input-field form__input-field--password"
              value={password}
              placeholder="***************"
              name="password"
              onChange={event => setPassword(event.target.value)}
              required
            />
            {inputType === 'password'
            && (
              <button
                type="button"
                onClick={showPassword}
                className="form__password-button form__password-button--show"
              >
              </button>
            )}
            {inputType === 'text'
            && (
              <button
                type="button"
                onClick={hidePassword}
                className="form__password-button form__password-button--hide"
              >
              </button>
            )}
          </div>
        </div>

        {loginError && <div className="form__error">Invalid username or password!</div>}

        <button
          className={classnames('form__submit', { 'form__loading': loading })}
          type="submit"
        >
          {loading ?(
            <span>Loading...</span>
          ) : (
            <span>Sign In</span>
          )
        }
        </button>
      </form>

      <div className="login__registration">
        Do not have account yet?
        {' '}
        <NavLink
          to="/auth/register"
          className="login__registration--link"
        >
          Sign Up
        </NavLink>
      </div>
    </div>
  );
};
