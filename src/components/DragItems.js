import React, { useState, useEffect } from 'react';

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
  const [imgSource, setImgSource] = useState('');

  // const handleImgSourceChange = (e) => {
  //   setImgSource(e.target.value);
  // };

  const handleSubmitImgSource = (e, itemIdx) => {
    // const tempList = JSON.parse(JSON.stringify(list));
    // tempList[groupIdx]['items'][itemIdx] = {
    //   ...tempList[groupIdx]['items'][itemIdx],
    //   content: imgSource,
    // };
    // console.log(tempList[groupIdx]['items'][itemIdx]['content']);
    // setList(tempList);
    const tempId = { ...imageId };
    tempId[list[groupIdx]['items'][itemIdx]['id']] = true;
    setImageId(tempId);
    setImgSource('');
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
                {/* <input
                  value={imgSource}
                  placeholder="Add image source..."
                  onChange={handleImgSourceChange}
                  className="image-input"
                /> */}
                <input
                  value={list[groupIdx]['items'][itemIdx]['content']}
                  placeholder="Add image source..."
                  onChange={(e) =>
                    handleInputChange(e, groupIdx, itemIdx, true)
                  }
                  className="image-input"
                />

                <div className="button-group">
                  <button onClick={(e) => handleSubmitImgSource(e, itemIdx)}>
                    <i className="fa fa-check"></i>
                  </button>
                  <button onClick={() => deleteCard(groupIdx, itemIdx)}>
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
