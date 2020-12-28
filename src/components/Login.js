import React, { useState } from 'react';
import { loginAuthentication, registerUser } from './helpers/backendHelpers';

const Login = ({
  handleMouseDown,
  handleMouseUp,
  setShowErrorMessage,
  setErrorMessages,
}) => {
  const initialState = { email: '', password: '' };
  const [formData, setFormData] = useState(initialState);
  const [showForm, setShowForm] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //send post to server
    try {
      let result;
      signUp
        ? (result = await registerUser(formData))
        : (result = await loginAuthentication(formData));
      if (result.errors) {
        const errorMessages = result.errors.map((err) => {
          return err.msg;
        });
        setShowErrorMessage(true);
        setErrorMessages(errorMessages);
        return;
      }
    } catch (err) {
      console.log(`clientside err ${err}`);
    }
    const resetLogin = document.getElementById('login-nav');
    resetLogin.classList.remove('clicked');
    setShowForm(false);
    setFormData(initialState);
  };

  const handleCancel = (e, name) => {
    e.preventDefault();
    setSignUp(false);
    const resetLogin = document.getElementById(name);
    resetLogin.classList.remove('clicked');
    setShowForm(false);
    setShowErrorMessage(false);
    setFormData(initialState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((oldFormData) => {
      return { ...oldFormData, [name]: value };
    });
  };

  return (
    <div>
      <div
        id="login-nav"
        className="login-nav"
        onMouseDown={(e) => handleMouseDown(e)}
        onClick={() => setShowForm(true)}
      >
        Login
      </div>

      {showForm && (
        <div className="login-form">
          <form className="login-container">
            <div className="login-title">{signUp ? 'Sign Up' : 'Login'}</div>
            <input
              name="email"
              value={formData.email}
              type="email"
              onChange={(e) => handleChange(e)}
              placeholder="Enter Email..."
            />
            <input
              name="password"
              value={formData.password}
              type="password"
              onChange={(e) => handleChange(e)}
              placeholder="Enter Password..."
            />
            <div className="login-button-group">
              <button
                className="login-button"
                onClick={(e) => handleSubmit(e)}
                disabled={
                  formData.email.length === 0 || formData.password.length === 0
                }
              >
                Submit
              </button>
              <button
                type="button"
                className="login-button"
                onClick={() => setSignUp(!signUp)}
              >
                {signUp ? 'Login' : 'Sign Up'}
              </button>
              <button
                className="login-button"
                onClick={(e) => handleCancel(e, 'login-nav')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
