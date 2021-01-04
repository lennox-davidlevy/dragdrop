import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

//A nice way to automatically generate group names rather than just
//"New Group 1", "New Group 2". The idea came from a game called Factorio
//where new train stations would be given random names of backers.
const getWords = async (setRandomWord) => {
  try {
    const res = await axios.get('/randomWord');
    setRandomWord(res.data);
  } catch (error) {
    console.error(error);
  }
};

//I wanted to recreate the duplicate naming conventions in windows
//ie "untitled", "untitled(2)" etc.
const checkForDupes = (boards, str, id) => {
  const dict = {};
  for (let i = 0; i < boards.length; i++) {
    let title = boards[i].title;
    let existingId = boards[i]._id;
    let temp = title.substr(0, title.indexOf('('));
    temp = temp || title;
    if (existingId === id && title === str) {
      dict[temp] = dict[temp] - 1;
      break;
    } else {
      dict[temp] = dict[temp] + 1 || 1;
    }
  }

  let newTitle;
  if (dict[str]) {
    newTitle = `${str}(${dict[str] + 1})`;
  } else {
    newTitle = str;
  }
  return newTitle;
};

//
const myFirstBoard = {
  id: uuidv4(),
  title: 'My First Board!',
  groups: [
    {
      id: uuidv4(),
      title: 'My First Group!',
      items: [
        {
          id: uuidv4(),
          title: '',
          image: false,
          content: 'My First Card!',
        },
      ],
    },
  ],
};

const templateBoard = function (str) {
  return {
    id: uuidv4(),
    title: str,
    groups: [
      {
        id: uuidv4(),
        title: 'New Group',
        items: [
          {
            id: uuidv4(),
            title: '',
            image: false,
            content: 'New Card',
          },
        ],
      },
    ],
  };
};

//login and auth using JWT. I am using JWT as a way to store user session here
//storing a token that expires in 1hr in local storage, and adding it to axios'
//common headers after authentication.
const loginAuthentication = async ({ email, password }) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/auth', body, options);
    localStorage.setItem('token', res.data.token);
    axios.defaults.headers.common['x-auth-token'] = res.data.token;
    return {
      email: res.data.payload.user.email,
      boards: res.data.payload.user.boards,
    };
  } catch (err) {
    const errors = err.response.data;
    return errors;
  }
};

const registerUser = async ({ email, password }) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password, myFirstBoard });
  try {
    const res = await axios.post('/user', body, options);

    localStorage.setItem('token', res.data.token);
    axios.defaults.headers.common['x-auth-token'] = res.data.token;
    return {
      email: res.data.payload.user.email,
      boards: res.data.payload.user.boards,
    };
  } catch (err) {
    const errors = err.response.data;
    return errors;
  }
};

const authenticateOnLoad = async (setUser, setBoards) => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
    return;
  }
  try {
    const res = await axios.get('/auth');
    setUser(res.data.email);
    setBoards(res.data.boards);
  } catch (err) {
    console.error(err);
  }
};

//sign out destroys token
const signOut = (setUser, setBoard, setShowGroup) => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['x-auth-token'];
  setUser(null);
  setBoard(null);
  setShowGroup(false);
};

//initially stored individual boards as its own model, in their own document
//then pushed the reference to the user.boards array.
//decided store a new array of of all user boards after change
//may revert, so users can share boards publicly using the board_id as a param
const saveBoardHelper = async (setBoards, tempBoards) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(tempBoards);
  try {
    const res = await axios.post('/boards', body, options);
    setBoards(res.data);
  } catch (err) {
    const errors = err.response.data;
    return errors;
  }
};

export {
  getWords,
  loginAuthentication,
  registerUser,
  authenticateOnLoad,
  signOut,
  saveBoardHelper,
  templateBoard,
  checkForDupes,
};
