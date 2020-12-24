import React, { useState, useRef } from 'react';

const DragItems = ({ items, groupIdx, groupId, dragItem }) => {
  const [current, setCurrent] = useState(false);
  const dragNode = useRef();

  const handleDragStart = (e, params) => {
    e.preventDefault();
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener('dragend', handleDragEnd);
    setCurrent(true);
  };

  // const handleDragEnd = (e, params) => {
  //   dragItem.current = null;
  //   setCurrent(false);
  // };

  const handleDragEnd = () => {
    console.log('ending drag');
    dragItem.current = null;
    dragNode.current = null;
    setCurrent(false);
  };

  const getStyles = (e, params) => {
    e.preventDefault();
    const currentItem = dragItem.current;
    const { groupIdx, itemIdx } = params;
    if (currentItem.groupIdx === groupIdx && currentItem.itemIdx === itemIdx) {
      return 'current drag-item';
    }
    return 'drag-item';
  };

  return (
    <div>
      {items.map((item, itemIdx) => {
        const { id, title, content } = item;
        return (
          <div
            draggable={true}
            onDragStart={(e) =>
              handleDragStart(e, { groupIdx, groupId, itemIdx, itemId: id })
            }
            // onDragEnd={(e) =>
            //   handleDragEnd(e, { groupIdx, groupId, itemIdx, itemId: groupId })
            // }
            key={itemIdx}
            id={id}
            className={
              current ? (e) => getStyles({ e, groupIdx, itemIdx }) : 'drag-item'
            }
          >
            <div className="item-title">{title}</div>
            <div className="item-content">{content}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DragItems;
