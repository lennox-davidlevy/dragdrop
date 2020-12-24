import React from 'react';
import Item from './Item';

const DragItems = ({
  items,
  groupIdx,
  groupId,
  current,
  handleDragEnter,
  handleDragStart,
  getStyles,
  deleteCard,
}) => {
  return (
    <div>
      {items.map((item, itemIdx) => {
        const { title, content } = item;
        const itemId = item.id;
        return (
          <Item
            key={itemIdx}
            groupIdx={groupIdx}
            groupId={groupId}
            itemIdx={itemIdx}
            itemId={itemId}
            current={current}
            handleDragEnter={handleDragEnter}
            handleDragStart={handleDragStart}
            getStyles={getStyles}
            title={title}
            content={content}
            deleteCard={deleteCard}
          />
        );
      })}
    </div>
  );
};

export default DragItems;
