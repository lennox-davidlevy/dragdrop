const express = require('express');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json({ extended: true }));

app.get('/', (req, res) => {
  res.send('API Running');
});

app.use('/login', require('./routes/user'));

app.listen(PORT, () => {
  console.log(`server started on ${PORT}...`);
});
