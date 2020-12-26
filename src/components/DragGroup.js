import React, { useState, useRef, useEffect } from 'react';
import DragItems from './DragItems';
import Button from './Button';
import Masonry from 'react-masonry-css';
import {
  handleDragStartHelper,
  handleDragEnterHelper,
  addCardHelper,
  getWordsHelper,
  addGroupHelper,
  returnItems,
  breakpointColumnsObj,
} from './dragHelpers';
import { v4 as uuidv4 } from 'uuid';

const DragGroup = ({ data }) => {
  const [list, setList] = useState(data);
  const [current, setCurrent] = useState(false);
  const [newGroupCheck, setNewGroupCheck] = useState(true);
  const [randomWord, setRandomWord] = useState([]);
  const [image, setImage] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [showAddCard, setShowAddCard] = useState(true);
  const [optionIdx, setOptionIdx] = useState(null);
  const dragItem = useRef();
  const dragNode = useRef();

  useEffect(() => {
    const loc = `${list.length - 1}input`;
    const newGroupInput = document.getElementById(loc);
    newGroupInput.focus();
    setNewGroupCheck(false);
  }, [newGroupCheck]);

  useEffect(() => {
    getWordsHelper(setRandomWord);
  }, []);

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
    addCardHelper(idx, isImage, list, setShowAddCard, setShowOption, setList);
  };

  const deleteCard = (groupIdx, itemIdx) => {
    let newList = JSON.parse(JSON.stringify(list));
    newList[groupIdx].items.splice(itemIdx, 1);
    setList(newList);
    setShowAddCard(true);
    setShowOption(false);
  };

  const addGroup = () => {
    addGroupHelper(
      list,
      randomWord,
      setRandomWord,
      setList,
      setNewGroupCheck,
      setShowAddCard,
      setShowOption
    );
  };

  const deleteGroup = (groupIdx) => {
    let newList = JSON.parse(JSON.stringify(list));
    newList.splice(groupIdx, 1);
    let newGroup = {
      id: '2',
      title: 'new group',
      items: [],
    };
    if (newList.length === 0) {
      newList.push(newGroup);
    }
    setList(newList);
    setShowAddCard(true);
    setShowOption(false);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const tempList = JSON.parse(JSON.stringify(list));
    tempList[index] = { ...tempList[index], [name]: value };
    setList(tempList);
  };

  const handleItemInputChange = (e, index, itemIndex) => {
    const { name, value } = e.target;
    const tempList = JSON.parse(JSON.stringify(list));
    tempList[index]['items'][itemIndex] = {
      ...tempList[index]['items'][itemIndex],
      [name]: value,
    };
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
    deleteGroup
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
