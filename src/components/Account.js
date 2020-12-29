import React, { useState, useContext } from 'react';
import { signOut } from './helpers/backendHelpers';
import { UserContext } from './UserContext';

const Account = ({ handleMouseDown, handleMouseUp }) => {
  const [showForm, setShowForm] = useState(false);
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <div
        id="login-account-nav"
        className="login-account-nav"
        onMouseDown={(e) => handleMouseDown(e)}
        onClick={() => setShowForm(true)}
      >
        Account
      </div>

      {showForm && (
        <div className="login-form">
          <form className="login-container">
            <div className="account-title">{`Welcome, ${user}`}</div>

            <div className="login-button-group">
              <button
                type="button"
                className="account-button"
                onClick={() => signOut(setUser)}
              >
                Sign Out
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Account;
