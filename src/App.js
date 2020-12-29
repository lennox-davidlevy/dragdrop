import './App.css';
import React, { useState, useMemo, useEffect } from 'react';
import { data, boardData } from './dummyData';
import DragGroup from './components/DragGroup';
import NavBar from './components/NavBar';
import ErrorMessage from './components/ErrorMessage';
import { UserContext } from './components/UserContext';
import axios from 'axios';
import { authenticateOnLoad } from './components/helpers/backendHelpers';
import Welcome from './components/Welcome';

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
      </UserContext.Provider>
    </div>
  );
};

export default App;
