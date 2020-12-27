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
  setList,
  imageId,
  setImageId,
}) => {
  const handleSubmitImgSource = (e, itemIdx) => {
    const tempId = { ...imageId };
    tempId[list[groupIdx]['items'][itemIdx]['id']] = true;
    setImageId(tempId);
  };

  return (
    <div>
      {items.map((item, itemIdx) => {
        const itemId = item.id;
        const image = item.image;
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
            <button
              className="delete-item"
              onClick={() => deleteCard(groupIdx, itemIdx)}
            >
              X
            </button>

            {image && imageId[itemId] ? (
              <img
                className="photo"
                src={list[groupIdx]['items'][itemIdx]['content']}
              />
            ) : image && !imageId[itemId] ? (
              <div className="image-group">
                <input
                  name="content"
                  value={list[groupIdx]['items'][itemIdx]['content']}
                  placeholder="Add image source..."
                  onChange={(e) =>
                    handleInputChange(e, groupIdx, itemIdx, true)
                  }
                  className="image-input"
                />

                <div className="button-group">
                  <button
                    className="icon-button"
                    onClick={(e) => handleSubmitImgSource(e, itemIdx)}
                  >
                    <i className="fa fa-check"></i>
                  </button>
                  <button
                    className="icon-button"
                    onClick={() => deleteCard(groupIdx, itemIdx)}
                  >
                    <i className="fa fa-window-close"></i>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <textarea
                  name="content"
                  className="item-content"
                  value={list[groupIdx]['items'][itemIdx]['content']}
                  onChange={(e) => handleInputChange(e, groupIdx, itemIdx)}
                  placeholder="Enter text here..."
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DragItems;
