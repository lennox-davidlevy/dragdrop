const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('../config/db');
const PORT = process.env.PORT || 5000;

connectDB();
const app = express();

// app.use(express.json({ extended: true }));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.get('/', (req, res) => {
  res.send('API Running');
});

app.use('/user', require('./routes/user'));
app.use('/randomWord', require('./routes/randomWord'));
app.use('/auth', require('./routes/auth'));
app.use('/boards', require('./routes/boards'));
app.listen(PORT, () => {
  console.log(`server started on ${PORT}...`);
});
