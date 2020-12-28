const express = require('express');
const PORT = process.env.PORT || 5000;
const connectDB = require('../config/db');

connectDB();
const app = express();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('API Running');
});

app.use('/user', require('./routes/user'));
app.use('/randomWord', require('./routes/randomWord'));
app.use('/auth', require('./routes/auth'));

app.listen(PORT, () => {
  console.log(`server started on ${PORT}...`);
});
