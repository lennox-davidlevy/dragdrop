import React, { useContext } from 'react';
import DragGroup from './DragGroup';
import { UserContext } from './UserContext';

const BoardsFolder = () => {
  const { boards, setBoard, setShowGroup } = useContext(UserContext);
  const handleClick = (key) => {
    setBoard(key);
    setShowGroup(true);
  };

  return (
    <div>
      {boards.map((board, key) => (
        <div onClick={() => handleClick(key)} key={key}>
          {board.title}
        </div>
      ))}
    </div>
  );
};

export default BoardsFolder;
