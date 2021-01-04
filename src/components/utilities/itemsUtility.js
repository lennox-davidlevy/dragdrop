import { setOnTopHelper } from './renderUtility';

//this function returns an array of items to masonry-css
//to render
const returnItems = (
  list,
  current,
  handleDragEnter,
  handleDragStart,
  handleInputChange,
  handleItemInputChange,
  DragItems,
  getStyles,
  deleteCard,
  showAddCard,
  handleShowAddCard,
  showOption,
  optionIdx,
  addCard,
  addGroup,
  deleteGroup,
  setList,
  imageId,
  setImageId
) => {
  return list.map((item, groupIdx) => {
    const { items } = item;

    const groupId = item.id;
    return (
      <div
        key={groupIdx}
        onDragEnter={
          current && !item.items.length
            ? (e) => handleDragEnter(e, { groupIdx, itemIdx: 0 })
            : null
        }
        className="drag-group on-top"
        onClick={setOnTopHelper('drag')}
      >
        <div className="title-container">
          <input
            id={`${groupIdx}input`}
            className="title-text"
            type="text"
            value={list[groupIdx]['title']}
            name="title"
            onChange={(e) => handleInputChange(e, groupIdx)}
          />
          <button
            className="delete-group-button"
            onClick={() => deleteGroup(groupIdx)}
          >
            X
          </button>
        </div>
        <DragItems
          list={list}
          items={items}
          groupIdx={groupIdx}
          groupId={groupId}
          current={current}
          handleDragEnter={handleDragEnter}
          handleDragStart={handleDragStart}
          getStyles={getStyles}
          deleteCard={deleteCard}
          handleInputChange={handleItemInputChange}
          setList={setList}
          imageId={imageId}
          setImageId={setImageId}
        />
        <div className="button-group">
          {optionIdx !== groupIdx && (
            <button
              className="add-card-button"
              onClick={() => handleShowAddCard(groupIdx)}
            >
              Add Card
            </button>
          )}
          {showOption && optionIdx === groupIdx && (
            <>
              <button
                className="icon-button"
                onClick={() => addCard(groupIdx, true)}
              >
                <i className="fa fa-image"></i>
              </button>
              <button
                className="icon-button"
                onClick={() => addCard(groupIdx, false)}
              >
                <i className="fa fa-file-text" aria-hidden="true"></i>
              </button>
            </>
          )}
        </div>
        {groupIdx === list.length - 1 && (
          <>
            <button className="add-card-button" onClick={() => addGroup()}>
              Add Group
            </button>
          </>
        )}
      </div>
    );
  });
};

export { returnItems };
