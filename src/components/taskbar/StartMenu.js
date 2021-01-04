import React, { useState, useContext } from 'react';
import windowsIcon from '../../img/windowsIcon.png';
import { signOut } from '../utilities/backendUtilities';
import { UserContext } from '../UserContext';

const StartMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const {
    setSignIn,
    signIn,
    user,
    setUser,
    setBoard,
    setShowGroup,
    showGroup,
    showAddBoardMessage,
    showMyBoards,
    setShowAbout,
    showAbout,
    setShowWelcome,
  } = useContext(UserContext);

  const handleMouseDown = (e) => {
    e.target.classList.toggle('clicked');
  };

  const handleSignIn = () => {
    const startNav = document.getElementById('start-nav');
    startNav.classList.toggle('clicked');
    setSignIn(!signIn);
    setShowMenu(false);
  };
  const handleSignOut = () => {
    const startNav = document.getElementById('start-nav');
    startNav.classList.toggle('clicked');
    signOut(setUser, setBoard, setShowGroup);
    setShowMenu(false);
    setShowWelcome(true);
  };

  const handleAddBoard = () => {
    const startNav = document.getElementById('start-nav');
    startNav.classList.toggle('clicked');
    if (!user || showGroup) {
      setShowMenu(false);
      return;
    }
    showAddBoardMessage();
    setShowMenu(false);
  };

  const handleShowAbout = () => {
    const startNav = document.getElementById('start-nav');
    startNav.classList.toggle('clicked');
    setShowAbout(!showAbout);
    setShowMenu(false);
  };

  const handleShowMyBoards = () => {
    const startNav = document.getElementById('start-nav');
    startNav.classList.toggle('clicked');
    showMyBoards();
    setShowMenu(false);
  };

  const handleCloseMenu = () => {
    const startNav = document.getElementById('start-nav');
    startNav.classList.toggle('clicked');
    setShowMenu(false);
  };
  return (
    <>
      <div
        id="start-nav"
        className="start-nav"
        onMouseDown={(e) => handleMouseDown(e)}
        onClick={() => setShowMenu(!showMenu)}
      >
        <img className="windows-icon" src={windowsIcon} alt="windows icon" />
        Board
      </div>
      {showMenu && (
        <div className="start-menu-container">
          <div id="left">
            <div className="b"></div>
          </div>
          <div onClick={() => handleShowAbout()} className="menu-item">
            About
          </div>
          <div className="menu-item" onClick={() => handleAddBoard()}>
            New Board
          </div>
          <div className="menu-item" onClick={() => handleShowMyBoards()}>
            My Boards
          </div>
          <div className="divider"></div>
          {user ? (
            <div onClick={() => handleSignOut()} className="menu-item">
              Sign Out
            </div>
          ) : (
            <div onClick={() => handleSignIn()} className="menu-item">
              Sign In
            </div>
          )}

          <div className="full-screen" onClick={() => handleCloseMenu()}></div>
        </div>
      )}
    </>
  );
};

export default StartMenu;
