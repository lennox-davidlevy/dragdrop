const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/', async (req, res) => {
  console.log('post ran');
  try {
    console.log('post ran try');
    res.status(200).send('router post works');
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    console.log(req.body);
    res.status(200).send('router get works');
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'server error' });
  }
});

module.exports = router;
