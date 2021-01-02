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
  } = useContext(UserContext);
  const handleClick = (key, boardTitle) => {
    console.log('boardTitle:', boardTitle);
    setBoard(key);
    setShowGroup(true);
    setBoardTitle(boardTitle);
  };

  return (
    <div className="welcome-container">
      <div className="boards-folder">
        {boards.map((board, key) => (
          <div
            className="folder"
            onClick={() => handleClick(key, board.title)}
            key={key}
          >
            <img src={emptyFolderIcon} />
            <span className="caption">{board.title}</span>
          </div>
        ))}
        <div className="folder" onClick={() => addBoard()}>
          <i className="fa fa-plus-circle fa-2x" aria-hidden="true"></i>
          <br />
          <span className="caption">Add Board</span>
        </div>
      </div>
    </div>
  );
};

export default BoardsFolder;
