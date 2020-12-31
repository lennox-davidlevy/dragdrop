const express = require('express');
const router = express.Router();

const auth = require('../authMiddleware');
const User = require('../../models/User');

// const boardData = [
//   {
//     id: 1223,
//     title: 'My New Board',
//     groups: [
//       {
//         title: 'My New Group',
//         id: 4567,
//         items: [
//           {
//             title: '',
//             image: false,
//             content: 'My new item',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 444555,
//     title: 'My New Board2',
//     groups: [
//       {
//         title: 'My New Group2',
//         id: 77777,
//         items: [
//           {
//             id: 123123124512,
//             title: '',
//             image: false,
//             content: 'My new item2',
//           },
//         ],
//       },
//     ],
//   },
// ];

// const groupData = [
//   {
//     title: 'New Group 1',
//     id: 'dfb35e2f-8b04-4b50-9d26-6cb76416c019',
//     items: [
//       {
//         id: 'b7298aaf-73b4-46d7-914e-ddef77d0539a',
//         title: 'New Card',
//         content: 'Hello!',
//       },
//       {
//         id: '166846f7-4bdc-431b-bb7f-b6f15a453b56',
//         title: 'Porcuipine!',
//         image: true,
//         content:
//           'https://img.buzzfeed.com/buzzfeed-static/static/2014-06/26/18/enhanced/webdr04/enhanced-29284-1403820861-1.jpg?downsize=900:*&output-format=auto&output-quality=auto',
//       },
//     ],
//   },
//   {
//     id: 'f3ad4754-8b04-41c3-832e-d4aad6465445',
//     title: 'Group Adelaide_Sabine',
//     items: [
//       {
//         id: '89bc32b9-b901-4fa9-a0fc-687f2f7d8a10',
//         title: 'New Card',
//         content: 'New One!',
//       },
//       {
//         id: '3a86eaa4-1dc4-4554-97d6-fbb315571c5b',
//         title: 'Wallpaper!',
//         image: true,
//         content: 'https://wallpaperaccess.com/full/493220.jpg',
//       },
//     ],
//   },
// ];

router.post('/', auth, async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: { boards: req.body },
      },
      { new: true }
    ).exec();

    res.send(result.boards);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
