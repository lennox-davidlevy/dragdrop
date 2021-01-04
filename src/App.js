import './App.css';
import React, { useState, useMemo, useEffect } from 'react';
import {
  authenticateOnLoad,
  saveBoardHelper,
  templateBoard,
  checkForDupes,
} from './components/utilities/backendUtilities';
import { UserContext } from './components/UserContext';
import DragGroup from './components/DragGroup';
import NavBar from './components/taskbar/NavBar';
import ErrorMessage from './components/messages/ErrorMessage';
import Welcome from './components/Welcome';
import BoardsFolder from './components/BoardsFolder';
import SignIn from './components/SignIn';
import SaveMessage from './components/messages/SaveMessage';
import DeleteMessage from './components/messages/DeleteMessage';
import AddBoardMessage from './components/messages/AddBoard';
import About from './components/taskbar/About';
import DesktopIcons from './components/DesktopIcons';

const App = () => {
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
  const [areSureDelete, setAreSureDelete] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [startSignUp, setStartSignUp] = useState(false);
  const [numberOfBoards, setNumberOfBoards] = useState(null);
  const [showAddBoard, setShowAddBoard] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showBoardsFolder, setShowBoardsFolder] = useState(false);

  useEffect(() => {
    authenticateOnLoad(setUser, setBoards);
  }, []);

  useEffect(() => {
    setNumberOfBoards(boards.length);
  }, [boards]);

  useEffect(() => {
    if (!board) return;
    setBoardTitle(boards[board]['title']);
  }, [board]);

  const saveBoard = () => {
    const a = document.getElementById('drag_drop');
    if (a === null) {
      setShowGroup(false);
      setShowBoardsFolder(true);
      return;
    }
    a.classList.add('collapse');
    const tempBoards = JSON.parse(JSON.stringify(boards));
    if (!hasChanged) {
      setTimeout(() => {
        setShowGroup(false);
        setShowBoardsFolder(true);
      }, 285);
      return;
    }
    const id = tempBoards[board]._id;
    let tempTitle = checkForDupes(tempBoards, boardTitle, id);

    const newBoard = {
      title: tempTitle,
      groups: currentBoard,
    };
    tempBoards[board] = newBoard;
    setTimeout(() => {
      saveBoardHelper(setBoards, tempBoards);
      setShowGroup(false);
      setShowBoardsFolder(true);
    }, 285);
    setHasChanged(false);
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
    setHasChanged(false);
    setShowBoardsFolder(true);
  };

  const addBoard = async () => {
    let tempBoardTitle = boardTitle || 'New Board';
    let tempBoards = JSON.parse(JSON.stringify(boards));
    let tempTitle = checkForDupes(tempBoards, tempBoardTitle);
    tempBoards.push(templateBoard(tempTitle));
    saveBoardHelper(setBoards, tempBoards).then(() => {
      setBoard(boards.length);
      setShowGroup(true);
      setShowBoardsFolder(false);
    });
  };

  const showAddBoardMessage = () => {
    setBoardTitle('');
    setShowAddBoard(true);
  };

  const showMyBoards = () => {
    if (hasChanged) {
      setAreSure(true);
      return;
    }
    setShowBoardsFolder(true);
  };

  const goBack = () => {
    if (hasChanged) {
      setAreSure(true);
      return;
    }
    setShowGroup(false);
  };

  const providerValue = useMemo(
    () => ({
      user,
      setUser,
      boards,
      setBoard,
      setBoards,
      setShowGroup,
      showGroup,
      showMyBoards,
      currentBoard,
      setCurrentBoard,
      boardTitle,
      setBoardTitle,
      hasChanged,
      setHasChanged,
      addBoard,
      signIn,
      setSignIn,
      showErrorMessage,
      setShowErrorMessage,
      setErrorMessages,
      setAreSure,
      saveBoard,
      deleteBoard,
      setAreSureDelete,
      setStartSignUp,
      numberOfBoards,
      setShowAddBoard,
      showAddBoardMessage,
      setShowAbout,
      showAbout,
      setShowBoardsFolder,
      setShowWelcome,
    }),
    [
      user,
      setUser,
      boards,
      boardTitle,
      setBoardTitle,
      areSure,
      areSureDelete,
      showGroup,
      startSignUp,
      numberOfBoards,
      showAddBoard,
      showAddBoardMessage,
      hasChanged,
      setHasChanged,
      showAbout,
      setShowAbout,
      showBoardsFolder,
      showWelcome,
      board,
    ]
  );

  return (
    <div className="App">
      <UserContext.Provider value={providerValue}>
        <NavBar />
        <div className="App-header">
          {showErrorMessage && (
            <ErrorMessage
              errorMessages={errorMessages}
              setShowErrorMessage={setShowErrorMessage}
            />
          )}
          {showWelcome && <Welcome />}
          {user && showBoardsFolder ? <BoardsFolder /> : null}
          {showAbout && <About />}
          {signIn && <SignIn />}
          {startSignUp && <SignIn startSignUp={true} />}
          {areSure && <SaveMessage boardTitle={boardTitle} />}
          {areSureDelete && <DeleteMessage boardTitle={boardTitle} />}
          {showGroup && <DragGroup data={boards[board]} />}
          {showAddBoard && <AddBoardMessage />}
        </div>
        <DesktopIcons
          saveBoard={saveBoard}
          showGroup={showGroup}
          setAreSureDelete={setAreSureDelete}
          goBack={goBack}
          showMyBoards={showMyBoards}
        />
      </UserContext.Provider>
    </div>
  );
};

export default App;
