import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const initialState = { user: '', password: '' };
  const [form, formData] = useState(initialState);
  const handleClickGet = async () => {
    try {
      const res = await axios.get('/login');
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickPost = async () => {
    try {
      const res = await axios.post('/login');
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <button onClick={handleClickGet}>Get</button>
      <button onClick={handleClickPost}>Post</button>
    </div>
  );
};

export default Login;
