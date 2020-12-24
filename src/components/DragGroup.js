import React, { useState, useRef } from 'react';
import DragItems from './DragItems';

const DragContainer = ({ data }) => {
  const [list, setList] = useState(data);
  const [current, setCurrent] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();

  const handleDragStart = (e, params) => {
    console.log('starting', params);
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

  return (
    <div className="drag_drop">
      {list.map((item, groupIdx) => {
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
            <div className="group-title">{title}</div>
            <DragItems />
          </div>
        );
      })}
    </div>
  );
};

export default DragContainer;
