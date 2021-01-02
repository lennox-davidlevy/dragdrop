import React, { useState, useContext } from 'react';
import { loginAuthentication, registerUser } from './helpers/backendHelpers';
import { UserContext } from './UserContext';

const Login = ({
  handleMouseDown,
  handleMouseUp,
  setShowErrorMessage,
  setErrorMessages,
}) => {
  const initialState = { email: '', password: '', password2: '' };
  const [formData, setFormData] = useState(initialState);
  const [showForm, setShowForm] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const { setUser, setBoards } = useContext(UserContext);

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
    } catch (err) {
      console.error(`clientside err ${err}`);
    }
    const resetLogin = document.getElementById('login-account-nav');
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
        id="login-account-nav"
        className="login-account-nav"
        onMouseDown={(e) => handleMouseDown(e)}
        onClick={() => setShowForm(true)}
      >
        Login
      </div>

      {showForm && (
        <div className="login-form">
          <form className="login-container">
            <div className="login-title">{signUp ? 'Sign Up' : 'Login'}</div>
            <div className="block">
              <label>User name:</label>
              <input
                name="email"
                value={formData.email}
                type="email"
                onChange={(e) => handleChange(e)}
                placeholder="Email..."
              />
            </div>
            <div className="block">
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
              <input
                name="password2"
                value={formData.password2}
                type="password"
                onChange={(e) => handleChange(e)}
                placeholder="Repeat Password..."
              />
            )}
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
                onClick={(e) => handleCancel(e, 'login-account-nav')}
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
