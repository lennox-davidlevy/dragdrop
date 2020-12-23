import './App.css';
import { data } from './dummyData';
import DragGroup from './components/DragGroup';

const App = () => {
  return (
    <div className="App">
      <div className="App-header">
        <DragGroup data={data} />
      </div>
    </div>
  );
};

export default App;
