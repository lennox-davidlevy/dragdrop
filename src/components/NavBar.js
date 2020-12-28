import React from 'react';
import Login from './Login';

const NavBar = ({ numberOfGroups, setShowErrorMessage, setErrorMessages }) => {
  const handleMouseDown = (e) => {
    e.target.classList.add('clicked');
  };
  const handleMouseUp = (e) => {
    e.target.classList.remove('clicked');
  };
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
        <Login
          handleMouseDown={handleMouseDown}
          handleMouseUp={handleMouseUp}
          setShowErrorMessage={setShowErrorMessage}
          setErrorMessages={setErrorMessages}
        />
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
