const express = require('express');
const PORT = process.env.PORT || 5000;
const connectDB = require('../config/db');

connectDB();
const app = express();
app.use(express.json({ extended: true }));

app.get('/', (req, res) => {
  res.send('API Running');
});

app.use('/login', require('./routes/user'));
app.use('/randomWord', require('./routes/randomWord'));

app.listen(PORT, () => {
  console.log(`server started on ${PORT}...`);
});
