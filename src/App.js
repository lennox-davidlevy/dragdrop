import './App.css';
import React, { useState, useMemo, useEffect } from 'react';

// import { boardData } from './dummyData';
import {
  authenticateOnLoad,
  saveBoardHelper,
  templateBoard,
  checkForDupes,
} from './components/helpers/backendHelpers';
import DragGroup from './components/DragGroup';
import NavBar from './components/NavBar';
import ErrorMessage from './components/ErrorMessage';
import Welcome from './components/Welcome';
import recycleIcon from './img/recycleBin.png';
import diskBlueIcon from './img/diskBlue.png';
import emptyFolderIcon from './img/emptyFolder.png';
import { UserContext } from './components/UserContext';

const App = () => {
  const [numberOfGroups, setNumberOfGroups] = useState(0);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [boards, setBoards] = useState([]);
  const [board, setBoard] = useState(null);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [boardTitle, setBoardTitle] = useState('');
  const [showGroup, setShowGroup] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [areSure, setAreSure] = useState(false);

  useEffect(() => {
    authenticateOnLoad(setUser, setBoards);
  }, []);

  useEffect(() => {
    if (!board) return;
    setBoardTitle(boards[board]['title']);
  }, [board]);

  const saveBoard = () => {
    const a = document.getElementById('drag_drop');
    if (a === null) {
      return;
    }
    a.classList.add('collapse');
    const tempBoards = JSON.parse(JSON.stringify(boards));
    if (!hasChanged) {
      setTimeout(() => {
        setShowGroup(!showGroup);
      }, 285);
      return;
    }
    setHasChanged(false);
    let tempTitle = checkForDupes(tempBoards, boardTitle);
    const newBoard = {
      title: tempTitle,
      groups: currentBoard,
    };
    tempBoards[board] = newBoard;
    setTimeout(() => {
      saveBoardHelper(setBoards, tempBoards);
      setShowGroup(!showGroup);
    }, 285);
  };

  const deleteBoard = () => {
    const a = document.getElementById('drag_drop');
    if (a === null) {
      return;
    }
    a.classList.add('collapse');
    let tempBoards = JSON.parse(JSON.stringify(boards));
    tempBoards = tempBoards.filter((item, el) => {
      return el !== board;
    });
    setTimeout(() => {
      saveBoardHelper(setBoards, tempBoards);
      setShowGroup(!showGroup);
    }, 285);
  };

  const addBoard = () => {
    let tempBoards = JSON.parse(JSON.stringify(boards));
    let tempTitle = checkForDupes(tempBoards, 'New Board');
    tempBoards.push(templateBoard(tempTitle));
    saveBoardHelper(setBoards, tempBoards);
  };

  const showMyBoards = () => {
    if (hasChanged) {
      console.log('ARE YOU SURE?');
      showGroup && setShowGroup(!showGroup);
      return;
    }
    showGroup && setShowGroup(!showGroup);
  };

  const providerValue = useMemo(
    () => ({
      user,
      setUser,
      boards,
      setBoard,
      setBoards,
      setShowGroup,
      currentBoard,
      setCurrentBoard,
      boardTitle,
      setBoardTitle,
      hasChanged,
      setHasChanged,
      addBoard,
    }),
    [user, setUser, boards, boardTitle, setBoardTitle]
  );

  return (
    <div className="App">
      <UserContext.Provider value={providerValue}>
        <NavBar
          numberOfGroups={numberOfGroups}
          setShowErrorMessage={setShowErrorMessage}
          setErrorMessages={setErrorMessages}
        />
        <div className="App-header">
          {showErrorMessage && (
            <ErrorMessage
              errorMessages={errorMessages}
              setShowErrorMessage={setShowErrorMessage}
            />
          )}
          {!showGroup ? (
            <Welcome
              user={user}
              boards={boards}
              setNumberOfGroups={setNumberOfGroups}
            />
          ) : (
            <DragGroup
              data={boards[board]}
              setNumberOfGroups={setNumberOfGroups}
            />
          )}
        </div>
        <div className="desktop-icons">
          <div className="save-board-icon-group">
            <img onClick={() => saveBoard()} src={diskBlueIcon} />
            <br></br>
            <span>Save Board</span>
          </div>
          <div className="delete-board-icon-group">
            <img onClick={() => deleteBoard()} src={recycleIcon} />
            <br></br>
            <span>Delete Board</span>
          </div>
          <div className="my-boards-icon-group">
            <img onClick={() => showMyBoards()} src={emptyFolderIcon} />
            <br></br>
            <span>My Boards</span>
          </div>
        </div>
      </UserContext.Provider>
    </div>
  );
};

export default App;
