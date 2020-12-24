import React, { useState, useRef } from 'react';
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

// return (
//   <div
//     onDragEnter={
//       current
//         ? (e) =>
//             handleDragEnter(e, {
//               groupIdx,
//               groupId,
//               itemIdx,
//               itemId: itemId,
//             })
//         : null
//     }
//     draggable={true}
//     onDragStart={(e) =>
//       handleDragStart(e, {
//         groupIdx,
//         groupId,
//         itemIdx,
//         itemId: itemId,
//       })
//     }
//     key={itemIdx}
//     id={itemId}
//     className={current ? getStyles({ groupIdx, itemIdx }) : 'drag-item'}
//   >
//     <div className="item-title">{title}</div>
//     <div className="item-content">{content}</div>
//   </div>
// );
