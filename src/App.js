import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <div className="drag_drop">
          <div className="drag-group">
            <div className="drag-item">
              <div className="item-title">Title</div>
              <div className="item-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam ac vulputate ligula. Morbi accumsan neque et feugiat
                  suscipit. In eu tellus sed ipsum faucibus tempus ut egestas
                  enim. Mauris in pellentesque tortor. Aliquam placerat at orci
                  ut consequat.
                </p>
              </div>
            </div>
            <div className="drag-item">
              <div className="item-title">Title</div>
              <div className="item-content">
                <p>
                  Maecenas volutpat purus et elit iaculis lobortis at a nibh.
                  Sed nec ligula placerat, placerat ipsum non, sollicitudin
                  ipsum. Duis blandit ipsum quis urna sollicitudin rutrum. C
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
