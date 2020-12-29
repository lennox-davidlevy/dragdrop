import React, { useContext } from 'react';
import BoardsFolder from './BoardsFolder';
import { UserContext } from './UserContext';

const Welcome = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="welcome-container">
      {!user ? (
        <div>WELCOME TO THOUGHT BOARD via WINDOWS 95 (why?)</div>
      ) : (
        <BoardsFolder />
      )}
    </div>
  );
};

export default Welcome;
