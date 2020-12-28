import React from 'react';
import Login from './Login';

const NavBar = ({ numberOfGroups }) => {
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
        />
        <div
          className="group-num-nav"
          onMouseDown={(e) => handleMouseDown(e)}
          onMouseUp={(e) => handleMouseUp(e)}
        >
          # of Groups: {numberOfGroups}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
