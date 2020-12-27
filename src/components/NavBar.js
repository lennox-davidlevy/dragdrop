import React from 'react';

const NavBar = ({ numberOfGroups }) => {
  return (
    <div className="taskBar">
      <div className="start-nav">Thought Board</div>
      <div className="right-side-nav">
        <div className="login-nav">Login</div>
        <div className="group-num-nav"># of Groups: {numberOfGroups}</div>
      </div>
    </div>
  );
};

export default NavBar;
