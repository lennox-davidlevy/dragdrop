import { v4 as uuidv4 } from 'uuid';

const handleDragStartHelper = (
  e,
  params,
  dragItem,
  dragNode,
  handleDragEnd,
  setCurrent
) => {
  dragItem.current = params;
  dragNode.current = e.target;
  dragNode.current.addEventListener('dragend', handleDragEnd);
  setTimeout(() => setCurrent(true), 0);
};

const handleDragEnterHelper = (e, params, dragItem, dragNode, setList) => {
  const currentItem = dragItem.current;
  if (e.target !== dragNode.current) {
    setList((oldList) => {
      let newList = JSON.parse(JSON.stringify(oldList));
      newList[params.groupIdx].items.splice(
        params.itemIdx,
        0,
        newList[currentItem.groupIdx].items.splice(currentItem.itemIdx, 1)[0]
      );
      dragItem.current = params;
      return newList;
    });
  }
};

const addCardHelper = (
  idx,
  isImage,
  list,
  setShowAddCard,
  setShowOption,
  setList
) => {
  let newList = JSON.parse(JSON.stringify(list));
  let newCard;
  if (isImage) {
    newCard = {
      id: uuidv4(),
      title: 'New Card',
      image: true,
      content:
        'https://i.pinimg.com/736x/90/42/0f/90420f59fe16af8912eb9a950951db6e.jpg',
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
  setList(newList);
};

const getWordsHelper = (setRandomWord) => {
  fetch(`https://random-word-api.herokuapp.com/word?number=1000`)
    .then((res) => res.json())
    .then(
      (result) => {
        setRandomWord(result);
      },
      (error) => console.log(error)
    );
};

const addGroupHelper = (
  list,
  randomWord,
  setRandomWord,
  setList,
  setNewGroupCheck,
  setShowAddCard,
  setShowOption
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
};

const returnItems = (
  list,
  current,
  handleDragEnter,
  handleDragStart,
  handleInputChange,
  handleItemInputChange,
  DragItems,
  getStyles,
  deleteCard,
  showAddCard,
  handleShowAddCard,
  showOption,
  optionIdx,
  addCard,
  addGroup,
  Button,
  deleteGroup
) => {
  return list.map((item, groupIdx) => {
    const { items } = item;
    const groupId = item.id;
    return (
      <div
        key={groupIdx}
        // id={groupId}
        onDragEnter={
          current && !item.items.length
            ? (e) => handleDragEnter(e, { groupIdx, itemIdx: 0 })
            : null
        }
        className="drag-group"
      >
        <input
          id={`${groupIdx}input`}
          className="title-text"
          type="text"
          value={list[groupIdx]['title']}
          name="title"
          onChange={(e) => handleInputChange(e, groupIdx)}
        />
        <DragItems
          list={list}
          items={items}
          groupIdx={groupIdx}
          groupId={groupId}
          current={current}
          handleDragEnter={handleDragEnter}
          handleDragStart={handleDragStart}
          getStyles={getStyles}
          deleteCard={deleteCard}
          handleInputChange={handleItemInputChange}
        />
        <div className="button-group">
          {showAddCard && (
            <button onClick={() => handleShowAddCard(groupIdx)}>
              Add Card
            </button>
          )}
          {showOption && optionIdx === groupIdx && (
            <div>
              <button onClick={() => addCard(groupIdx, true)}>Add Image</button>
              <button onClick={() => addCard(groupIdx, false)}>Add Text</button>
            </div>
          )}
          {/* <Button clickHandler={addCard} item={groupIdx} title="Add Card" /> */}
          <Button
            clickHandler={deleteGroup}
            item={groupIdx}
            title="Delete Group"
          />
          {groupIdx === list.length - 1 && (
            <Button clickHandler={addGroup} title="Add Group" />
          )}
        </div>
      </div>
    );
  });
};

const breakpointColumnsObj = {
  default: 2,
  1440: 3,
  1100: 3,
  900: 2,
  500: 1,
};

export {
  handleDragStartHelper,
  handleDragEnterHelper,
  addCardHelper,
  getWordsHelper,
  addGroupHelper,
  returnItems,
  breakpointColumnsObj,
};
