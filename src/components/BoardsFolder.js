import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import emptyFolderIcon from '../img/emptyFolder.png';
import fullFolderIcon from '../img/fullFolder.png';

const BoardsFolder = () => {
  const { boards, setBoard, setShowGroup } = useContext(UserContext);
  const handleClick = (key) => {
    setBoard(key);
    setShowGroup(true);
  };

  return (
    <div className="boards-folder">
      {boards.map((board, key) => (
        <div className="folder" onClick={() => handleClick(key)} key={key}>
          <img src={emptyFolderIcon} />
          <span className="caption">{board.title}</span>
        </div>
      ))}
      <div className="folder">
        <i className="fa fa-plus-circle fa-2x" aria-hidden="true"></i>
        <br />
        <span className="caption">Add Board</span>
      </div>
    </div>
  );
};

export default BoardsFolder;
