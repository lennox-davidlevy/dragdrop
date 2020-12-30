import './App.css';
import React, { useState, useMemo, useEffect } from 'react';
import { boardData } from './dummyData';
import { authenticateOnLoad } from './components/helpers/backendHelpers';
import DragGroup from './components/DragGroup';
import NavBar from './components/NavBar';
import ErrorMessage from './components/ErrorMessage';
import Welcome from './components/Welcome';
import recycleIcon from './img/recycleBin.png';
import { UserContext } from './components/UserContext';

const App = () => {
  const [numberOfGroups, setNumberOfGroups] = useState(0);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [boards, setBoards] = useState(boardData);
  const [board, setBoard] = useState(null);
  const [showGroup, setShowGroup] = useState(false);
  const providerValue = useMemo(
    () => ({ user, setUser, boards, setBoard, setShowGroup }),
    [user, setUser, boards]
  );

  useEffect(() => {
    authenticateOnLoad(setUser);
  }, []);

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
          <img className="recyle" src={recycleIcon} />
        </div>
      </UserContext.Provider>
    </div>
  );
};

export default App;
