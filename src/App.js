import './App.css';
import { data } from './dummyData';
import DragGroup from './components/DragGroup';
import Login from './components/Login';

const App = () => {
  return (
    <div className="App">
      <div className="App-header">
        {/* <Login /> */}
        <DragGroup data={data} />
      </div>
    </div>
  );
};

export default App;
