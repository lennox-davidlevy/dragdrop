const express = require('express');
const router = express.Router();
const request = require('request');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const config = require('config');

router.get('/', async (req, res) => {
  try {
    const options = {
      uri: `http://names.drycodes.com/1000?nameOptions=girl_names`,
      method: 'GET',
      headers: {
        'user-agent': 'node.js',
      },
    };
    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        res.status(404).json({ msg: `No Words` });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('server error');
  }
});

module.exports = router;
