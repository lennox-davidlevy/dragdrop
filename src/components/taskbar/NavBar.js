import React from 'react';

import StartMenu from './StartMenu';
import Clock from './Clock';

const NavBar = () => {
  return (
    <div className="taskBar">
      <StartMenu />
      <div className="right-side-nav">
        <Clock />
      </div>
    </div>
  );
};

export default NavBar;
