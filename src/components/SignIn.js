import React, { useState, useContext } from 'react';
import { loginAuthentication, registerUser } from './helpers/backendHelpers';
import { UserContext } from './UserContext';
import loginIcon from '../img/loginIcon.png';

const SignIn = ({ startSignUp = false }) => {
  const initialState = { email: '', password: '', password2: '' };
  const [formData, setFormData] = useState(initialState);
  const [signUp, setSignUp] = useState(startSignUp);
  const {
    setUser,
    setBoards,
    setSignIn,
    setShowErrorMessage,
    setErrorMessages,
    setStartSignUp,
  } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //send post to server
    const { email, password, password2 } = formData;
    try {
      let result;
      if (signUp) {
        if (password !== password2) {
          setShowErrorMessage(true);
          setErrorMessages(['Password does not match']);
          return;
        }
        result = await registerUser({ email, password });
      } else {
        result = await loginAuthentication({ email, password });
      }

      if (result.errors) {
        const errorMessages = result.errors.map((err) => {
          return err.msg;
        });
        setShowErrorMessage(true);
        setErrorMessages(errorMessages);
        return;
      }
      setUser(result.email);
      setBoards(result.boards);
      setSignIn(false);
      setStartSignUp(false);
    } catch (err) {
      console.error(`clientside err ${err}`);
    }
    // const resetLogin = document.getElementById('login-account-nav');
    // resetLogin.classList.remove('clicked');
    setFormData(initialState);
  };

  const handleCancel = (e, name) => {
    // e.preventDefault();
    // const resetLogin = document.getElementById(name);
    // resetLogin.classList.remove('clicked');
    setSignIn(false);
    setShowErrorMessage(false);
    setFormData(initialState);
    setStartSignUp(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((oldFormData) => {
      return { ...oldFormData, [name]: value };
    });
  };
  return (
    <>
      <div className="login-message-parent-container">
        <div className="title-container">
          <div className="error-title-text">{signUp ? 'Signup' : 'Login'}</div>
          <button
            type="button"
            className="delete-group-button"
            onClick={() => handleCancel()}
          >
            X
          </button>
        </div>
        <div className="login-message-container">
          <div className="message-contents">
            <img className="message-icon" src={loginIcon} alt="saveChanges" />
            <span>Enter Username and Password </span>
          </div>
        </div>
        <div className="login-input-container">
          <div className="login-block">
            <label>User name:</label>
            <input
              name="email"
              value={formData.email}
              type="email"
              onChange={(e) => handleChange(e)}
              placeholder="Email..."
            />
          </div>
          <div className="login-block">
            <label>Password:</label>
            <input
              name="password"
              value={formData.password}
              type="password"
              onChange={(e) => handleChange(e)}
              placeholder="Password..."
            />
          </div>
          {signUp && (
            <div className="login-block">
              <label>Password:</label>
              <input
                name="password2"
                value={formData.passwords}
                type="password"
                onChange={(e) => handleChange(e)}
                placeholder="Password..."
              />
            </div>
          )}
        </div>
        <div className="login-message-button-group">
          <button
            className="message-button"
            onClick={(e) => handleSubmit(e)}
            disabled={
              formData.email.length === 0 || formData.password.length === 0
            }
          >
            OK
          </button>
          <button className="message-button" onClick={() => handleCancel()}>
            Cancel
          </button>
          <button
            type="button"
            className="message-button"
            onClick={() => setSignUp(!signUp)}
          >
            {signUp ? 'Login' : 'Sign Up'}
          </button>
        </div>
      </div>
    </>
  );
};

export default SignIn;
