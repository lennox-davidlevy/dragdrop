const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  id: String,
  image: Boolean,
  content: String,
});

const GroupSchema = new mongoose.Schema({
  id: String,
  title: String,
  items: [ItemSchema],
});

const BoardSchema = new mongoose.Schema({
  board: [
    {
      id: String,
      title: String,
      groups: [GroupSchema],
    },
  ],
});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  boards: [BoardSchema],
});

module.exports = User = mongoose.model('user', UserSchema);
