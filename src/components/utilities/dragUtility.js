//Rather than use the React-dnd package, I wanted to build the drag and drop
//utility. I have found JSON.parse(JSON.stringify(object)) to be the most
//consistent way to deep copy objects and utilizing the hook useRef to keep track
//of which individual card is being either dragged, or dragged over
const handleDragStartHelper = (
  e,
  params,
  dragItem,
  dragNode,
  handleDragEnd,
  setCurrent
) => {
  dragItem.current = params;
  dragNode.current = e.target;
  dragNode.current.addEventListener('dragend', handleDragEnd);
  setTimeout(() => setCurrent(true), 0);
};

const handleDragEnterHelper = (e, params, dragItem, dragNode, setList) => {
  const currentItem = dragItem.current;
  if (e.target !== dragNode.current) {
    setList((oldList) => {
      let newList = JSON.parse(JSON.stringify(oldList));
      newList[params.groupIdx].items.splice(
        params.itemIdx,
        0,
        newList[currentItem.groupIdx].items.splice(currentItem.itemIdx, 1)[0]
      );
      dragItem.current = params;
      return newList;
    });
  }
};

export { handleDragEnterHelper, handleDragStartHelper };
