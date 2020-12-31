import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

//WITHOUT NODE
// const getWords = (setRandomWord) => {
//   fetch(`https://random-word-api.herokuapp.com/word?number=1000`)
//     .then((res) => res.json())
//     .then(
//       (result) => {
//         setRandomWord(result);
//       },
//       (error) => console.log(error)
//     );
// };

//WITH NODE
const getWords = async (setRandomWord) => {
  try {
    const res = await axios.get('/randomWord');
    setRandomWord(res.data);
  } catch (error) {
    console.error(error);
  }
};

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

const signOut = (setUser, setBoard, setShowGroup) => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['x-auth-token'];
  setUser(null);
  setBoard(null);
  setShowGroup(false);
};

const saveBoardHelper = async (board, setBoards) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(board);
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
};
