import React, { useContext } from 'react';
import saveChangesIcon from '../../img/saveChanges.png';
import { UserContext } from '../UserContext';
const AddBoardMessage = () => {
  const { setBoardTitle, boardTitle, setShowAddBoard, addBoard } = useContext(
    UserContext
  );
  const handleChange = (e) => {
    const { value } = e.target;
    setBoardTitle(value);
  };
  const handleCancel = () => {
    setShowAddBoard(false);
  };

  const handleSubmit = (e) => {
    e.target.classList.add('clicked');
    if (boardTitle.length === 0) {
      setBoardTitle('New Board');
    }
    addBoard();
    setShowAddBoard(false);
  };

  return (
    <div className="error-message-container">
      <div className="title-container">
        <div className="error-title-text">New Board</div>
        <button
          type="button"
          className="delete-group-button"
          onClick={() => setShowAddBoard(false)}
        >
          X
        </button>
      </div>
      <div className="title-message-container">
        <div className="message-contents">
          <img
            className="message-icon"
            src={saveChangesIcon}
            alt="saveChanges"
          />
          <span>Set title for new board </span>
        </div>
      </div>
      <div className="title-block">
        <label>Enter Title:</label>
        <input value={boardTitle} onChange={(e) => handleChange(e)} />
      </div>
      <div className="title-button-group">
        <button
          className="message-button"
          type="button"
          onClick={(e) => handleSubmit(e)}
        >
          Save
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

export default AddBoardMessage;
