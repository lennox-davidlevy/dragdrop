import React, { useContext } from 'react';
import notepadIcon from '../../img/notepad.png';
import mePixelated from '../../img/mePixelated2.jpg';
import { UserContext } from '../UserContext';
import { setOnTopHelper } from '../utilities/renderUtility';

const About = () => {
  const { setShowAbout } = useContext(UserContext);
  return (
    <div
      id="about-container"
      onClick={(e) => setOnTopHelper('about')}
      className="about-container"
    >
      <div className="notepad-container">
        <div className="notepad">
          <div className="title-container">
            <div className="notepad-icon">
              <img src={notepadIcon} alt="notepad icon" />
              <div className="title-text">About - Notepad</div>
            </div>
            <button
              onClick={() => setShowAbout(false)}
              className="delete-group-button"
            >
              X
            </button>
          </div>
          <div className="notepad-content">
            <h2>About me</h2>

            <span>-----------------------------------------------</span>
            <br></br>
            <br></br>
            <div className="about-picture-container">
              <img
                style={{ height: '100px', width: '100px' }}
                className="about-picture"
                src={mePixelated}
                alt="me but pixelated"
              />
              <p>
                My name is David, and I made this project for very little
                reason, but it was a lot of fun. I hope you had a bit of fun
                playing around with it.
              </p>
            </div>
            <span>-----------------------------------------------</span>
            <br></br>
            <br></br>
            <h3>Useful Links</h3>
            <p>
              Check out any of the links below or email me at
              lennox.davidlevy@gmail.com
            </p>

            <br></br>
            <br></br>
            <b>
              <a
                href="https://github.com/lennox-davidlevy"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </b>
            <br></br>
            <br></br>
            <b>
              <a
                href="https://www.linkedin.com/in/david-levy-b3a1aa121/"
                target="_blank"
                rel="noreferrer"
              >
                Linkedin
              </a>
            </b>
            <br></br>
            <br></br>
            <b>
              <a
                href="https://david-lennox.com"
                target="_blank"
                rel="noreferrer"
              >
                Portfolio
              </a>
            </b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
