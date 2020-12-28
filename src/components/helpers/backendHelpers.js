import axios from 'axios';

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

const loginAuthentication = async ({ email, password }) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/auth', body, options);
    console.log(res.data.token);
    return res.data.token;
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
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/user', body, options);
    console.log(res);
    return res;
  } catch (err) {
    const errors = err.response.data;
    return errors;
  }
};

export { getWords, loginAuthentication, registerUser };
