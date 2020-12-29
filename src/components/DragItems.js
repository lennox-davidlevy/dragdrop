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
        const { image, title } = item;
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
            // id={itemId}
            className={current ? getStyles({ groupIdx, itemIdx }) : 'drag-item'}
          >
            <div className="grab-bar">
              <span className="grippy"></span>
              {image && (
                <input
                  name="title"
                  className="item-title"
                  value={title}
                  onChange={(e) => handleInputChange(e, groupIdx, itemIdx)}
                />
              )}
              <button
                className="delete-item"
                onClick={() => deleteCard(groupIdx, itemIdx)}
              >
                X
              </button>
            </div>

            {image && imageId[itemId] ? (
              <img
                className="photo"
                src={list[groupIdx]['items'][itemIdx]['content']}
                alt="uploaded for your board"
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
                    disabled={
                      list[groupIdx]['items'][itemIdx]['content'].length === 0
                    }
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
