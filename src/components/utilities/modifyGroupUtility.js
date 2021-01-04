import { v4 as uuidv4 } from 'uuid';

//Rather than make database calls for all changes, these functions
//store changes in state. Because of this, I used uuidv4 as an id instead
//of mongodb provided ids for everything except board._id
const addCardHelper = (
  idx,
  isImage,
  list,
  setShowAddCard,
  setShowOption,
  setList,
  setOptionIdx
) => {
  let newList = JSON.parse(JSON.stringify(list));
  let newCard;
  if (isImage) {
    newCard = {
      id: uuidv4(),
      title: 'New Card',
      image: true,
      content: '',
    };
  } else {
    newCard = {
      id: uuidv4(),
      title: 'New Card',
      content: '',
    };
  }
  newList[idx].items.push(newCard);
  setShowAddCard(true);
  setShowOption(false);
  setOptionIdx(null);
  setList(newList);
};

const addGroupHelper = (
  list,
  randomWord,
  setRandomWord,
  setList,
  setNewGroupCheck,
  setShowAddCard,
  setShowOption,
  setOptionIdx
) => {
  let newList = JSON.parse(JSON.stringify(list));
  const tempRandomWord = [...randomWord];
  let word;
  if (tempRandomWord.length > 0) {
    const tempWord = tempRandomWord.pop();
    word = tempWord.charAt(0).toUpperCase() + tempWord.slice(1);
    setRandomWord(tempRandomWord);
  } else {
    word = 'Fetch Off';
  }

  let currentGroup = {
    id: uuidv4(),
    title: `Group ${word}`,
    items: [],
  };
  newList.push(currentGroup);
  setList(newList);
  setNewGroupCheck(true);
  setShowAddCard(true);
  setShowOption(false);
  setOptionIdx(null);
};

export { addCardHelper, addGroupHelper };
