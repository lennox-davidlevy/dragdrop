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
  deleteGroup,
  setList,
  imageId,
  setImageId
) => {
  return list.map((item, groupIdx) => {
    const { items } = item;

    const groupId = item.id;
    return (
      <div
        key={groupIdx}
        onDragEnter={
          current && !item.items.length
            ? (e) => handleDragEnter(e, { groupIdx, itemIdx: 0 })
            : null
        }
        className="drag-group on-top"
        onClick={setOnTopHelper('drag')}
      >
        <div className="title-container">
          <input
            id={`${groupIdx}input`}
            className="title-text"
            type="text"
            value={list[groupIdx]['title']}
            name="title"
            onChange={(e) => handleInputChange(e, groupIdx)}
          />
          <button
            className="delete-group-button"
            onClick={() => deleteGroup(groupIdx)}
          >
            X
          </button>
        </div>
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
          setList={setList}
          imageId={imageId}
          setImageId={setImageId}
        />
        <div className="button-group">
          {optionIdx !== groupIdx && (
            <button
              className="add-card-button"
              onClick={() => handleShowAddCard(groupIdx)}
            >
              Add Card
            </button>
          )}
          {showOption && optionIdx === groupIdx && (
            <>
              <button
                className="icon-button"
                onClick={() => addCard(groupIdx, true)}
              >
                <i className="fa fa-image"></i>
              </button>
              <button
                className="icon-button"
                onClick={() => addCard(groupIdx, false)}
              >
                <i className="fa fa-file-text" aria-hidden="true"></i>
              </button>
            </>
          )}
        </div>
        {groupIdx === list.length - 1 && (
          <>
            <button className="add-card-button" onClick={() => addGroup()}>
              Add Group
            </button>
          </>
        )}
      </div>
    );
  });
};

const breakpointColumnsObj = {
  default: 5,
  2000: 5,
  1900: 4,
  1500: 4,
  1400: 3,
  1160: 2,
  999: 2,
  765: 1,
  525: 1,
};

const handleImageId = (list) => {
  let dict = {};
  for (let i = 0; i < list.length; i++) {
    const groupItems = list[i].items;
    groupItems.forEach((item) => {
      if (item.image) {
        dict = { ...dict, [item.id]: true };
      }
    });
  }
  return dict;
};

const setOnTopHelper = (containerName) => {
  const boardsContainer = document.getElementById('boards-folder-container');
  const welcomeContainer = document.getElementById('welcome-container');
  const aboutContainer = document.getElementById('about-container');
  const dragContainer = document.getElementById('drag_drop');
  const dragGroupContainer = document.getElementsByClassName('drag-group');

  //set the clicked window to be on top
  //not very elegant tbh will have to come back and think of something better.
  if (containerName === 'welcome') {
    if (boardsContainer !== null) {
      boardsContainer.classList.remove('on-top');
    }
    if (aboutContainer !== null) {
      aboutContainer.classList.remove('on-top');
    }

    // if (dragContainer !== null) {
    //   dragContainer.classList.remove('on-top');
    // }
    // if (dragGroupContainer !== null) {
    //   console.log('ran');
    //   Array.from(dragGroupContainer).forEach((el) => {
    //     el.classList.remove('on-top');
    //   });
    // }
    welcomeContainer.classList.add('on-top');
  } else if (containerName === 'boards') {
    if (welcomeContainer !== null) {
      welcomeContainer.classList.remove('on-top');
    }
    if (aboutContainer !== null) {
      aboutContainer.classList.remove('on-top');
    }

    // if (dragContainer !== null) {
    //   dragContainer.classList.remove('on-top');
    // }

    // if (dragGroupContainer !== null) {
    //   console.log('ran');

    //   Array.from(dragGroupContainer).forEach((el) => {
    //     el.classList.remove('on-top');
    //   });
    // }
    boardsContainer.classList.add('on-top');
  } else if (containerName === 'about') {
    if (welcomeContainer !== null) {
      welcomeContainer.classList.remove('on-top');
    }
    if (boardsContainer !== null) {
      boardsContainer.classList.remove('on-top');
    }

    // if (dragContainer !== null) {
    //   dragContainer.classList.remove('on-top');
    // }
    // if (dragGroupContainer !== null) {
    //   console.log('ran');

    //   Array.from(dragGroupContainer).forEach((el) => {
    //     el.classList.remove('on-top');
    //   });
    // }
    aboutContainer.classList.add('on-top');
  } else if (containerName === 'drag') {
    if (boardsContainer !== null) {
      boardsContainer.classList.remove('on-top');
    }
    if (aboutContainer !== null) {
      aboutContainer.classList.remove('on-top');
    }
    if (welcomeContainer !== null) {
      welcomeContainer.classList.remove('on-top');
    }

    // if (dragContainer !== null) {
    //   dragContainer.classList.add('on-top');
    // }
    // if (dragGroupContainer !== null) {
    //   console.log('ran');

    //   Array.from(dragGroupContainer).forEach((el) => {
    //     el.classList.add('on-top');
    //   });
    // }
  }
};

export {
  handleDragStartHelper,
  handleDragEnterHelper,
  addCardHelper,
  addGroupHelper,
  returnItems,
  breakpointColumnsObj,
  handleImageId,
  setOnTopHelper,
};
