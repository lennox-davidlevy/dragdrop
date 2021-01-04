import React from 'react';
import errorIcon from '../../img/Error.png';
const ErrorMessage = ({ errorMessages, setShowErrorMessage }) => {
  return (
    <div className="error-message-container">
      <div className="title-container">
        <div className="error-title-text">Error</div>
        <button
          type="button"
          className="delete-group-button"
          onClick={() => setShowErrorMessage(false)}
        >
          X
        </button>
      </div>
      <div className="message-container">
        <div className="message-contents">
          <img className="message-icon" src={errorIcon} alt="error" />
          <ul className="message-list">
            {errorMessages.map((message, key) => {
              return <li key={key}>{message}</li>;
            })}
          </ul>
        </div>
      </div>
      <button
        className="message-button"
        type="button"
        onClick={() => setShowErrorMessage(false)}
      >
        OK
      </button>
    </div>
  );
};

export default ErrorMessage;
