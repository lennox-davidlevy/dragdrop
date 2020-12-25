import React, { useState, useRef, useEffect } from 'react';
import DragItems from './DragItems';
import Button from './Button';
import Masonry from 'react-masonry-css';

const DragContainer = ({ data }) => {
  const [list, setList] = useState(data);
  const [current, setCurrent] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();

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
      id: 123,
      title: 'new',
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
    let currentGroup = {
      id: '2',
      title: 'new group',
      items: [],
    };
    newList.push(currentGroup);
    setList(newList);
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

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const tempList = JSON.parse(JSON.stringify(list));
    tempList[index] = { ...tempList[index], [name]: value };
    setList(tempList);
  };

  const items = list.map((item, groupIdx) => {
    const { title, items } = item;
    const groupId = item.id;
    return (
      <div
        key={groupIdx}
        id={groupId}
        onDragEnter={
          current && !item.items.length
            ? (e) => handleDragEnter(e, { groupIdx, itemIdx: 0 })
            : null
        }
        className="drag-group"
      >
        <input
          className="title-text"
          type="text"
          value={list[groupIdx]['title']}
          name="title"
          onChange={(e) => handleInputChange(e, groupIdx)}
        />
        <DragItems
          items={items}
          groupIdx={groupIdx}
          groupId={groupId}
          current={current}
          handleDragEnter={handleDragEnter}
          handleDragStart={handleDragStart}
          getStyles={getStyles}
          deleteCard={deleteCard}
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

export default DragContainer;
