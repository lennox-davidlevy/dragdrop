import React, { useState, useRef, useEffect, useContext } from 'react';
import DragItems from './DragItems';
import Button from './Button';
import Masonry from 'react-masonry-css';
import {
  handleDragStartHelper,
  handleDragEnterHelper,
  addCardHelper,
  addGroupHelper,
  returnItems,
  breakpointColumnsObj,
  handleImageId,
} from './helpers/frontendHelpers.js';
import { getWords } from './helpers/backendHelpers';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from './UserContext';

const DragGroup = ({ data, setNumberOfGroups }) => {
  const [list, setList] = useState(data);
  const [current, setCurrent] = useState(false);
  const [newGroupCheck, setNewGroupCheck] = useState(true);
  const [randomWord, setRandomWord] = useState([]);
  const [showOption, setShowOption] = useState(false);
  const [showAddCard, setShowAddCard] = useState(true);
  const [optionIdx, setOptionIdx] = useState(null);
  const [imageId, setImageId] = useState({});
  const dragItem = useRef();
  const dragNode = useRef();

  const { setCurrentBoard } = useContext(UserContext);

  useEffect(() => {
    const loc = `${list.length - 1}input`;
    const newGroupInput = document.getElementById(loc);
    newGroupInput.focus();
    setNewGroupCheck(false);
    setNumberOfGroups(list.length);
  }, [newGroupCheck, list.length]);

  useEffect(() => {
    let dict = handleImageId(list);
    setImageId(dict);
  }, []);

  useEffect(() => {
    getWords(setRandomWord);
  }, []);

  useEffect(() => {
    setCurrentBoard(list);
  }, [list]);

  const handleDragStart = (e, params) => {
    handleDragStartHelper(
      e,
      params,
      dragItem,
      dragNode,
      handleDragEnd,
      setCurrent
    );
  };

  const handleDragEnter = (e, params) => {
    handleDragEnterHelper(e, params, dragItem, dragNode, setList);
  };

  const handleDragEnd = () => {
    setCurrent(false);
    dragNode.current.removeEventListener('dragend', handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };
  const getStyles = (params) => {
    const currentItem = dragItem.current;
    const { groupIdx, itemIdx } = params;
    if (currentItem.groupIdx === groupIdx && currentItem.itemIdx === itemIdx) {
      return 'current drag-item';
    }
    return 'drag-item';
  };

  const addCard = (idx, isImage) => {
    addCardHelper(
      idx,
      isImage,
      list,
      setShowAddCard,
      setShowOption,
      setList,
      setOptionIdx
    );
  };

  const deleteCard = (groupIdx, itemIdx) => {
    let newList = JSON.parse(JSON.stringify(list));
    newList[groupIdx].items.splice(itemIdx, 1);
    setList(newList);
    setShowAddCard(true);
    setShowOption(false);
    setOptionIdx(null);
  };

  const addGroup = () => {
    addGroupHelper(
      list,
      randomWord,
      setRandomWord,
      setList,
      setNewGroupCheck,
      setShowAddCard,
      setShowOption,
      setOptionIdx
    );
  };

  const deleteGroup = (groupIdx) => {
    let newList = JSON.parse(JSON.stringify(list));
    newList.splice(groupIdx, 1);
    const tempRandomWord = [...randomWord];
    let word;
    if (tempRandomWord.length > 0) {
      const tempWord = tempRandomWord.pop();
      word = tempWord.charAt(0).toUpperCase() + tempWord.slice(1);
      setRandomWord(tempRandomWord);
    } else {
      word = 'Fetch Off';
    }
    let newGroup = {
      id: uuidv4(),
      title: `Group ${word}`,
      items: [],
    };
    if (newList.length === 0) {
      newList.push(newGroup);
    }
    setList(newList);
    setShowAddCard(true);
    setShowOption(false);
    setOptionIdx(null);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const tempList = JSON.parse(JSON.stringify(list));
    tempList[index] = { ...tempList[index], [name]: value };
    setList(tempList);
  };

  const handleItemInputChange = (e, index, itemIndex, imageChange) => {
    const { name, value } = e.target;
    const tempList = JSON.parse(JSON.stringify(list));
    if (imageChange) {
      tempList[index]['items'][itemIndex] = {
        ...tempList[index]['items'][itemIndex],
        [name]: value,
      };
    } else {
      tempList[index]['items'][itemIndex] = {
        ...tempList[index]['items'][itemIndex],
        [name]: value,
      };
    }
    setList(tempList);
  };

  const handleShowAddCard = (idx) => {
    setShowAddCard(false);
    setShowOption(true);
    setOptionIdx(idx);
  };

  const items = returnItems(
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
    Button,
    deleteGroup,
    setList,
    imageId,
    setImageId
  );

  return (
    <div className="drag_drop">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {items && items}
      </Masonry>
    </div>
  );
};

export default DragGroup;
