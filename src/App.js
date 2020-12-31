import './App.css';
import React, { useState, useMemo, useEffect } from 'react';

// import { boardData } from './dummyData';
import {
  authenticateOnLoad,
  saveBoardHelper,
} from './components/helpers/backendHelpers';
import DragGroup from './components/DragGroup';
import NavBar from './components/NavBar';
import ErrorMessage from './components/ErrorMessage';
import Welcome from './components/Welcome';
import recycleIcon from './img/recycleBin.png';
import diskBlueIcon from './img/diskBlue.png';
import { UserContext } from './components/UserContext';

const App = () => {
  const [numberOfGroups, setNumberOfGroups] = useState(0);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [boards, setBoards] = useState([]);
  const [board, setBoard] = useState(null);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [boardTitle, setBoardtitle] = useState('');
  const [showGroup, setShowGroup] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [areSure, setAreSure] = useState(false);
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
      hasChanged,
      setHasChanged,
    }),
    [user, setUser, boards]
  );

  useEffect(() => {
    authenticateOnLoad(setUser, setBoards);
  }, []);

  const saveBoard = () => {
    const a = document.getElementById('drag_drop');
    if (a === null) {
      return;
    }
    const tempBoards = JSON.parse(JSON.stringify(boards));
    tempBoards[board] = currentBoard;
    console.log(tempBoards);
    a.classList.add('collapse');
    setHasChanged(false);

    if (!hasChanged) {
      console.log('nothing changed!');
      setTimeout(() => {
        setShowGroup(!showGroup);
      }, 285);
      return;
    }
    setTimeout(() => {
      const newBoard = {
        title: 'Brand New Board',
        groups: currentBoard,
      };
      saveBoardHelper(newBoard, setBoards);
      setShowGroup(!showGroup);
    }, 285);
  };

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
              data={boards[board]['groups']}
              setNumberOfGroups={setNumberOfGroups}
            />
          )}
        </div>
        <div className="desktop-icons">
          <img
            onClick={() => saveBoard()}
            className="recyle"
            src={diskBlueIcon}
          />
        </div>
      </UserContext.Provider>
    </div>
  );
};

export default App;
