import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ handleMouseDown, handleMouseUp }) => {
  const initialState = { email: '', password: '' };
  const [formData, setFormData] = useState(initialState);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    //send post to server
    const resetLogin = document.getElementById('login-nav');
    resetLogin.classList.remove('clicked');
    setShowForm(false);
    setFormData(initialState);
  };

  const handleCancel = () => {
    const resetLogin = document.getElementById('login-nav');
    resetLogin.classList.remove('clicked');
    setShowForm(false);
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
                className="submit-button"
                onClick={(e) => handleSubmit(e)}
                disabled={
                  formData.email.length === 0 || formData.password.length === 0
                }
              >
                Submit
              </button>
              <button className="cancel-button" onClick={() => handleCancel()}>
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
