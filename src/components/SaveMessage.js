import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import saveChangesIcon from '../img/saveChanges.png';

const SaveMessage = ({ boardTitle }) => {
  const { setAreSure, setShowGroup, saveBoard } = useContext(UserContext);

  const handleSave = () => {
    setAreSure(false);
    saveBoard();
    console.log('Save and Close');
  };

  const handleCloseWithoutSaving = () => {
    setAreSure(false);
    setShowGroup(false);
    console.log('Close without saving');
  };

  const handleCancel = () => {
    setAreSure(false);
    console.log('Close without saving');
  };

  return (
    <div className="error-message-container">
      <div className="title-container">
        <div className="error-title-text">Board</div>
        <button
          type="button"
          className="delete-group-button"
          onClick={() => setAreSure(false)}
        >
          X
        </button>
      </div>
      <div className="message-container">
        <div className="message-contents">
          <img
            className="message-icon"
            src={saveChangesIcon}
            alt="saveChanges"
          />
          <span>Do you want to save changes to {boardTitle}? </span>
        </div>
      </div>
      <div className="save-message-button-group">
        <button
          className="message-button"
          type="button"
          onClick={() => handleSave()}
        >
          Yes
        </button>
        <button
          className="message-button"
          type="button"
          onClick={() => handleCloseWithoutSaving()}
        >
          No
        </button>
        <button
          className="message-button"
          type="button"
          onClick={() => handleCancel()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SaveMessage;