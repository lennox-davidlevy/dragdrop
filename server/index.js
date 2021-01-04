const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('../config/db');
const path = require('path');
const PORT = process.env.PORT || 5000;

connectDB();
const app = express();

// app.use(express.json({ extended: true }));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use('/user', require('./routes/user'));
app.use('/randomWord', require('./routes/randomWord'));
app.use('/auth', require('./routes/auth'));
app.use('/boards', require('./routes/boards'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
  });
}
app.listen(PORT, () => {
  console.log(`server started on ${PORT}...`);
});
