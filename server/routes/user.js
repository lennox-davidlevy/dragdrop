const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// POST /user

router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    res.status(200).send('router post works');
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    res.status(200).send('router get works');
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'server error' });
  }
});

module.exports = router;
