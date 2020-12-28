import { v4 as uuidv4 } from 'uuid';

const data = [
  {
    id: uuidv4(),
    title: 'Animals',
    items: [
      { id: uuidv4(), title: 'random', content: 'Cute Rabbit!', image: false },
      {
        id: '123456',
        title: 'random',
        content:
          'https://www.rd.com/wp-content/uploads/2020/04/GettyImages-694542042-e1586274805503.jpg',
        image: true,
      },
    ],
  },
  {
    id: uuidv4(),
    title: 'Cute',
    items: [],
  },
  {
    id: uuidv4(),
    title: 'Cutest',
    items: [
      {
        id: uuidv4(),
        title: 'random',
        content: 'Cute porcupine!',
        image: false,
      },
      {
        id: '45678',
        title: 'random',
        content:
          'https://thedisneyblog.com/wp-content/uploads/2020/05/WDW-Porcupette-Shelley-1.jpg',
        image: true,
      },
    ],
  },
];

export { data };
