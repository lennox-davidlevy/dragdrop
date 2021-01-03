import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import emptyFolderIcon from '../img/emptyFolder.png';
import fullFolderIcon from '../img/fullFolder.png';

const BoardsFolder = () => {
  const {
    boards,
    setBoard,
    setBoardTitle,
    setShowGroup,
    addBoard,
    numberOfBoards,
    setShowAddBoard,
    showAddBoardMessage,
  } = useContext(UserContext);
  const handleClick = (key, boardTitle) => {
    setBoard(key);
    setShowGroup(true);
    setBoardTitle(boardTitle);
  };

  return (
    <div className="notepad-container">
      <div className="folder-container">
        <div className="title-container">
          <div className="notepad-icon">
            <img src={fullFolderIcon} alt="full folder icon" />
            <div className="title-text">My Boards</div>
          </div>
          <button className="delete-group-button">X</button>
        </div>
        <div className="notepad-content">
          <div className="boards-folder">
            {boards.map((board, key) => (
              <div
                className="folder"
                onClick={() => handleClick(key, board.title)}
                key={key}
              >
                <img src={emptyFolderIcon} alt="my boards icon" />
                <span className="caption">{board.title}</span>
              </div>
            ))}
            <div className="folder" onClick={() => showAddBoardMessage()}>
              <i className="fa fa-plus-circle fa-2x" aria-hidden="true"></i>
              <br />
              <span className="caption">Add Board</span>
            </div>
          </div>
        </div>
        <div className="boards-folder-bottom-bar">
          <div className="board-folder-bottom-left">
            {numberOfBoards} Board(s)
          </div>
          <div className="board-folder-bottom-right">0 bytes</div>
        </div>
      </div>
    </div>
  );
};

export default BoardsFolder;
