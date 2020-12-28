import './App.css';
import React, { useState } from 'react';
import { data } from './dummyData';
import DragGroup from './components/DragGroup';
import NavBar from './components/NavBar';
import ErrorMessage from './components/ErrorMessage';

const App = () => {
  const [numberOfGroups, setNumberOfGroups] = useState(0);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  return (
    <div className="App">
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
        <DragGroup data={data} setNumberOfGroups={setNumberOfGroups} />
      </div>
    </div>
  );
};

export default App;
