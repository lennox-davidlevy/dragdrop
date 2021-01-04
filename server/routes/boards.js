const express = require('express');
const router = express.Router();

const auth = require('../authMiddleware');
const User = require('../../models/User');

router.post('/', auth, async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(
      req.user.id,
      {
        boards: req.body,
      },
      { new: true }
    )
      .select('-password')
      .exec();
    res.send(result.boards);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
