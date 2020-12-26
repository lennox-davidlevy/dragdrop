import React from 'react';

const DragItems = ({
  list,
  items,
  groupIdx,
  groupId,
  current,
  handleDragEnter,
  handleDragStart,
  handleInputChange,
  getStyles,
  deleteCard,
}) => {
  return (
    <div>
      {items.map((item, itemIdx) => {
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
            <div
              className="delete-item"
              onClick={() => deleteCard(groupIdx, itemIdx)}
            >
              X
            </div>
            <input
              name="title"
              type="text"
              className="item-title"
              value={list[groupIdx]['items'][itemIdx]['title']}
              onChange={(e) => handleInputChange(e, groupIdx, itemIdx)}
            />
            <textarea
              name="content"
              className="item-content"
              value={list[groupIdx]['items'][itemIdx]['content']}
              onChange={(e) => handleInputChange(e, groupIdx, itemIdx)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DragItems;
