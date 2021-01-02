import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import saveChangesIcon from '../img/saveChanges.png';

const DeleteMessage = ({ boardTitle }) => {
  const { setAreSureDelete, deleteBoard } = useContext(UserContext);

  const handleDelete = () => {
    setAreSureDelete(false);
    deleteBoard();
  };

  const handleCloseWithoutDeleting = () => {
    setAreSureDelete(false);
  };

  return (
    <div className="error-message-container">
      <div className="title-container">
        <div className="error-title-text">Confirm Board Delete</div>
        <button
          type="button"
          className="delete-group-button"
          onClick={() => setAreSureDelete(false)}
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
          <span>
            Are you sure you want to remove {boardTitle} and all it's contents?{' '}
          </span>
        </div>
      </div>
      <div className="delete-message-button-group">
        <button
          className="message-button"
          type="button"
          onClick={() => handleDelete()}
        >
          Yes
        </button>
        <button
          className="message-button"
          type="button"
          onClick={() => handleCloseWithoutDeleting()}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteMessage;
