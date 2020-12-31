const mongoose = require('mongoose');
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
  boards: [
    {
      id: String,
      title: String,
      groups: [
        {
          title: String,
          id: String,
          items: [
            {
              id: String,
              title: String,
              image: Boolean,
              content: '',
            },
          ],
        },
      ],
    },
  ],
});

module.exports = User = mongoose.model('user', UserSchema);
