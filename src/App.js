import './App.css';
import React, { useState } from 'react';
import { data } from './dummyData';
import DragGroup from './components/DragGroup';
import NavBar from './components/NavBar';

const App = () => {
  const [numberOfGroups, setNumberOfGroups] = useState(0);

  return (
    <div className="App">
      <NavBar numberOfGroups={numberOfGroups} />
      <div className="App-header">
        <DragGroup data={data} setNumberOfGroups={setNumberOfGroups} />
      </div>
    </div>
  );
};

export default App;
