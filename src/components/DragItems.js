import React, { useState, useRef } from 'react';

const DragItems = ({
  items,
  groupIdx,
  groupId,
  current,
  handleDragEnter,
  handleDragStart,
  getStyles,
}) => {
  return (
    <div>
      {items.map((item, itemIdx) => {
        const { title, content } = item;
        const itemId = item.id;
        return (
          <div
            onDragEnter={
              current
                ? (e) =>
                    handleDragEnter(e, {
                      groupIdx,
                      groupId,
                      itemIdx,
                      itemId: itemId,
                    })
                : null
            }
            draggable={true}
            onDragStart={(e) =>
              handleDragStart(e, {
                groupIdx,
                groupId,
                itemIdx,
                itemId: itemId,
              })
            }
            key={itemIdx}
            id={itemId}
            className={current ? getStyles({ groupIdx, itemIdx }) : 'drag-item'}
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
