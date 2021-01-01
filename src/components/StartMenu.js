import React, { useState, useContext } from 'react';
import windowsIcon from '../img/windowsIcon.png';
import { UserContext } from './UserContext';

const StartMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { setSignIn, signIn } = useContext(UserContext);

  const handleMouseDown = (e) => {
    e.target.classList.toggle('clicked');
  };
  return (
    <>
      <div
        className="start-nav"
        onMouseDown={(e) => handleMouseDown(e)}
        onClick={() => setShowMenu(!showMenu)}
      >
        <img className="windows-icon" src={windowsIcon} />
        Board
      </div>
      {showMenu && (
        <div className="start-menu-container">
          <div id="left">
            <div className="b"></div>
          </div>
          <div className="menu-item">About</div>
          <div className="menu-item">New Board</div>
          <div className="menu-item">My Boards</div>
          <div className="divider"></div>
          <div onClick={() => setSignIn(!signIn)} className="menu-item">
            Sign In
          </div>
          {/* <div
            className="full-screen"
            onClick={() => console.log('full screen clicked')}
          ></div> */}
        </div>
      )}
    </>
  );
};

export default StartMenu;
