import React from 'react';
import recycleIcon from '../img/recycleBin.png';
import diskBlueIcon from '../img/diskBlue.png';
import emptyFolderIcon from '../img/emptyFolder.png';
import goBackIcon from '../img/goBackIcon.png';

const DesktopIcons = ({
  saveBoard,
  showGroup,
  setAreSureDelete,
  goBack,
  showMyBoards,
}) => {
  return (
    <div className="desktop-icons">
      <div onClick={() => saveBoard()} className="save-board-icon-group">
        <img src={diskBlueIcon} alt="save icon" />
        <br></br>
        <span>Save Board</span>
      </div>
      <div
        onClick={() => showGroup && setAreSureDelete(true)}
        className="delete-board-icon-group"
      >
        <img src={recycleIcon} alt="delete icon" />
        <br></br>
        <span>Delete Board</span>
      </div>
      <div onClick={() => goBack()} className="go-back-icon-group">
        <img src={goBackIcon} alt="go back icon" />
        <br></br>
        <span>Close Board</span>
      </div>
      <div onClick={() => showMyBoards()} className="my-boards-icon-group">
        <img src={emptyFolderIcon} alt="my boards icon" />
        <br></br>
        <span>My Boards</span>
      </div>
    </div>
  );
};

export default DesktopIcons;
