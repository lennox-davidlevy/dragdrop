import React, { useState, useRef, useEffect } from 'react';
import DragItems from './DragItems';
import Button from './Button';
import Masonry from 'react-masonry-css';
import { fetchRandomWordArray, breakpointColumnsObj } from '../helper';
import { v4 as uuidv4 } from 'uuid';

const DragGroup = ({ data }) => {
  const [list, setList] = useState(data);
  const [current, setCurrent] = useState(false);
  const [newGroupCheck, setNewGroupCheck] = useState(true);
  const [randomWord, setRandomWord] = useState([]);
  const [image, setImage] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();

  useEffect(() => {
    const loc = `${list.length - 1}input`;
    const newGroupInput = document.getElementById(loc);
    newGroupInput.focus();
    setNewGroupCheck(false);
  }, [newGroupCheck]);

  useEffect(() => {
    fetch(`https://random-word-api.herokuapp.com/word?number=1000`)
      .then((res) => res.json())
      .then(
        (result) => {
          setRandomWord(result);
        },
        (error) => console.log(error)
      );
  }, []);

  const handleDragStart = (e, params) => {
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener('dragend', handleDragEnd);
    setTimeout(() => setCurrent(true), 0);
  };

  const handleDragEnter = (e, params) => {
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

  const handleDragEnd = () => {
    setCurrent(false);
    dragNode.current.removeEventListener('dragend', handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };
  const getStyles = (params) => {
    const currentItem = dragItem.current;
    const { groupIdx, itemIdx } = params;
    if (currentItem.groupIdx === groupIdx && currentItem.itemIdx === itemIdx) {
      return 'current drag-item';
    }
    return 'drag-item';
  };

  const addCard = (idx) => {
    let newList = JSON.parse(JSON.stringify(list));
    newList[idx].items.push({
      id: uuidv4(),
      title: 'New Card',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac vulputate ligula. Morbi accumsan neque et feugiat suscipit. In eu tellus sed ipsum faucibus tempus ut egestas enim.',
    });
    setList(newList);
  };

  const deleteCard = (groupIdx, itemIdx) => {
    let newList = JSON.parse(JSON.stringify(list));
    newList[groupIdx].items.splice(itemIdx, 1);
    setList(newList);
  };

  const addGroup = () => {
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
  };

  const deleteGroup = (groupIdx) => {
    let newList = JSON.parse(JSON.stringify(list));
    newList.splice(groupIdx, 1);
    let newGroup = {
      id: '2',
      title: 'new group',
      items: [],
    };
    if (newList.length === 0) {
      newList.push(newGroup);
    }
    setList(newList);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const tempList = JSON.parse(JSON.stringify(list));
    tempList[index] = { ...tempList[index], [name]: value };
    setList(tempList);
  };

  const handleItemInputChange = (e, index, itemIndex) => {
    const { name, value } = e.target;
    const tempList = JSON.parse(JSON.stringify(list));
    tempList[index]['items'][itemIndex] = {
      ...tempList[index]['items'][itemIndex],
      [name]: value,
    };
    setList(tempList);
  };

  const items = list.map((item, groupIdx) => {
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
        <Button clickHandler={addCard} item={groupIdx} title="Add Card" />
        <Button
          clickHandler={deleteGroup}
          item={groupIdx}
          title="Delete Group"
        />
        {groupIdx === list.length - 1 && (
          <Button clickHandler={addGroup} title="Add Group" />
        )}
      </div>
    );
  });

  return (
    <div className="drag_drop">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {items && items}
      </Masonry>
    </div>
  );
};

export default DragGroup;
