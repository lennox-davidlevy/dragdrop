import React, { useContext } from 'react';
import notepadIcon from '../img/notepad.png';
import { UserContext } from './UserContext';

const Welcome = () => {
  const { setSignIn, setStartSignUp } = useContext(UserContext);
  return (
    <div className="notepad-container">
      <div className="notepad">
        <div className="title-container">
          <div className="notepad-icon">
            <img src={notepadIcon} alt="notepad icon" />
            <div className="title-text">Untitled - Notepad</div>
          </div>
          <button className="delete-group-button">X</button>
        </div>
        <div className="notepad-content">
          <h3>Welcome to Board</h3>
          <br></br>
          <p>
            So this project started as a way to make a masonry drag and drop app
            in react.
          </p>
          <p>
            While I was doing that, I decided to take inspiration from the first
            OS I ever used
          </p>
          <p>
            So, I present to you my drag and drop board in the style of Windows
            95!
          </p>
          <span>-----------------------------------------------</span>
          <p>
            <span className="welcome-buttons" onClick={() => setSignIn(true)}>
              <b>Login!</b>
            </span>
          </p>
          <p>
            <span>OR</span>
          </p>
          <p>
            <span
              className="welcome-buttons"
              onClick={() => setStartSignUp(true)}
            >
              <b>Create an account!</b>
            </span>

            <br></br>
            <br></br>
            <span>-----------------------------------------------</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
