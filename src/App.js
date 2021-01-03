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
import BoardsFolder from './components/BoardsFolder';
import recycleIcon from './img/recycleBin.png';
import diskBlueIcon from './img/diskBlue.png';
import emptyFolderIcon from './img/emptyFolder.png';
import { UserContext } from './components/UserContext';
import SignIn from './components/SignIn';
import SaveMessage from './components/SaveMessage';
import DeleteMessage from './components/DeleteMessage';
import AddBoardMessage from './components/AddBoard';

const App = () => {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [boards, setBoards] = useState([]);
  const [board, setBoard] = useState(null);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [boardTitle, setBoardTitle] = useState('');
  // const [newBoardAdded, setNewBoardAdded] = useState(false);
  const [showGroup, setShowGroup] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [areSure, setAreSure] = useState(false);
  const [areSureDelete, setAreSureDelete] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [startSignUp, setStartSignUp] = useState(false);
  const [numberOfBoards, setNumberOfBoards] = useState(null);
  const [showAddBoard, setShowAddBoard] = useState(false);
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
      return;
    }
    a.classList.add('collapse');
    const tempBoards = JSON.parse(JSON.stringify(boards));
    if (!hasChanged) {
      setTimeout(() => {
        setShowGroup(false);
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
    }, 285);
    setHasChanged(false);
    // setNewBoardAdded(false);
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

  const addBoard = async () => {
    let tempBoardTitle = boardTitle || 'New Board';
    let tempBoards = JSON.parse(JSON.stringify(boards));
    let tempTitle = checkForDupes(tempBoards, tempBoardTitle);
    tempBoards.push(templateBoard(tempTitle));
    saveBoardHelper(setBoards, tempBoards).then(() => {
      setBoard(boards.length);
      setShowGroup(true);
    });
  };

  const showAddBoardMessage = () => {
    setBoardTitle('');
    setShowAddBoard(true);
  };

  const showMyBoards = () => {
    if (hasChanged) {
      setAreSure(true);
      // showGroup && setShowGroup(!showGroup);
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
          {signIn && <SignIn />}
          {startSignUp && <SignIn startSignUp={true} />}
          {areSure && <SaveMessage boardTitle={boardTitle} />}
          {areSureDelete && <DeleteMessage boardTitle={boardTitle} />}
          {!user ? <Welcome /> : !showGroup ? <BoardsFolder /> : null}
          {showGroup && <DragGroup data={boards[board]} />}
          {showAddBoard && <AddBoardMessage />}
        </div>
        <div className="desktop-icons">
          <div className="save-board-icon-group">
            <img
              onClick={() => saveBoard()}
              src={diskBlueIcon}
              alt="save icon"
            />
            <br></br>
            <span>Save Board</span>
          </div>
          <div className="delete-board-icon-group">
            <img
              onClick={() => showGroup && setAreSureDelete(true)}
              src={recycleIcon}
              alt="delete icon"
            />
            <br></br>
            <span>Delete Board</span>
          </div>
          <div className="my-boards-icon-group">
            <img
              onClick={() => showMyBoards()}
              src={emptyFolderIcon}
              alt="my boards icon"
            />
            <br></br>
            <span>My Boards</span>
          </div>
        </div>
      </UserContext.Provider>
    </div>
  );
};

export default App;
