import React from 'react';

const Item = ({
  groupIdx,
  groupId,
  itemIdx,
  itemId,
  current,
  handleDragEnter,
  handleDragStart,
  getStyles,
  title,
  content,
  deleteCard,
}) => {
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
      <div className="item-title">{title}</div>
      <div className="item-content">{content}</div>
    </div>
  );
};

export default Item;
//For possible rever
// <Item
//   key={itemIdx}
//   groupIdx={groupIdx}
//   groupId={groupId}
//   itemIdx={itemIdx}
//   itemId={itemId}
//   current={current}
//   handleDragEnter={handleDragEnter}
//   handleDragStart={handleDragStart}
//   getStyles={getStyles}
//   title={title}
//   content={content}
//   deleteCard={deleteCard}
// />
