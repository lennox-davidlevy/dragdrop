import React, { useContext } from 'react';
import Account from './Account';
import Login from './Login';
import { UserContext } from './UserContext';

const NavBar = ({ numberOfGroups, setShowErrorMessage, setErrorMessages }) => {
  const handleMouseDown = (e) => {
    e.target.classList.add('clicked');
  };
  const handleMouseUp = (e) => {
    e.target.classList.remove('clicked');
  };
  const { user } = useContext(UserContext);

  return (
    <div className="taskBar">
      <div
        className="start-nav"
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseUp={(e) => handleMouseUp(e)}
      >
        Thought Board
      </div>
      <div className="right-side-nav">
        {!user ? (
          <Login
            handleMouseDown={handleMouseDown}
            handleMouseUp={handleMouseUp}
            setShowErrorMessage={setShowErrorMessage}
            setErrorMessages={setErrorMessages}
          />
        ) : (
          <Account
            handleMouseDown={handleMouseDown}
            handleMouseUp={handleMouseUp}
          />
        )}

        {numberOfGroups === 1 ? (
          <div className="group-num-nav">{numberOfGroups} Group</div>
        ) : (
          <div className="group-num-nav">{numberOfGroups} Groups</div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
