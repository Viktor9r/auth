import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { registration } from '../../api';
import { Header } from '../Header/Header';
import './Registration.scss';
import classnames from 'classnames';

export const Registration: React.FC = () => {
  const [displayName, setDisplayName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [lengthError, setLengthError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [inputType, setInputType] = useState('password');
  const [loading, setLoading] = useState(false);

  const clearForm = () => {
    setDisplayName('');
    setUserName('');
    setPassword('');
    setConfirmPassword('');
  };

  const navigation = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    if (password.length < 8 && password !== confirmPassword && userError === true) {
      setLengthError(true);
      setPasswordError(true);
      setUserError(false);
      setLoading(false);
      clearForm();

      return;
    }

    if (password.length < 8 && userError === true) {
      setLengthError(true);
      setPasswordError(false);
      setUserError(false);
      setLoading(false);
      clearForm();

      return;
    }

    if (password !== confirmPassword && userError === true) {
      setPasswordError(true);
      setLengthError(false);
      setLoading(false);
      setUserError(false);
      clearForm();

      return;
    }

    const response = await registration(password, username, displayName);

    if (!response.ok && response.status === 409) {
      setUserError(true);
      setLengthError(false);
      setPasswordError(false);
      setLoading(false);
      clearForm();
    } else {
      clearForm();
      navigation('/auth/login', { replace: true });
    }
  };

  const showPassword = () => {
    setInputType('text');
  };

  const hidePassword = () => {
    setInputType('password');
  };

  return (
    <div className="registration container">
      <Header />
      <form
        method="post"
        className="form registration__form"
        onSubmit={handleSubmit}
      >
        <div className="form__title">Sign Up</div>
        <div className="form__input">
          <label
            className="form__input-title"
            htmlFor="displayName"
          >
            Full Name
          </label>
          <input
            id="displayName"
            type="text"
            className="form__input-field"
            value={displayName}
            placeholder="Example Name"
            name="displayName"
            onChange={event => setDisplayName(event.target.value)}
            required
          />
        </div>

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
            value={username}
            placeholder="Example123"
            name="username"
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

        <div className="form__input form__input--last">
          <label
            className="form__input-title"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <div className="form__input-block">
            <input
              id="confirmPassword"
              type={inputType}
              className="form__input-field form__input-field--password"
              value={confirmPassword}
              placeholder="***************"
              name="confirmPassword"
              onChange={event => setConfirmPassword(event.target.value)}
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

        {lengthError && <div className="form__error">Password must be at least 8 characters long!</div>}
        {passwordError && <div className="form__error">Passwords are not the same!</div>}
        {userError && <div className="form__error">Username is already used by another user!</div>}

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

      <div className="registration__auth">
        I have an account.
        {' '}
        <NavLink
          to="/auth/login"
          className="registration__auth--link"
        >
          Go to Sign in
        </NavLink>
      </div>
    </div>
  );
};
