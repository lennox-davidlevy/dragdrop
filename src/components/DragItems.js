import React from 'react';

const DragItems = ({ items }) => {
  return (
    <div>
      {items.map((item, key) => {
        const { id, title, content } = item;
        return (
          <div key={id} className="drag-item">
            <div className="item-title">{title}</div>
            <div className="item-content">{content}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DragItems;
