//masonry-css breakpoints
const breakpointColumnsObj = {
  default: 5,
  2000: 5,
  1900: 4,
  1500: 4,
  1400: 3,
  1160: 2,
  999: 2,
  765: 1,
  525: 1,
};

//keep a dictionary of image uuid4s to use as a check for rendering after
//load from db
const handleImageId = (list) => {
  let dict = {};
  for (let i = 0; i < list.length; i++) {
    const groupItems = list[i].items;
    for (let j = 0; j < groupItems.length; j++) {
      let item = groupItems[j];
      if (item.image) {
        dict = { ...dict, [item.id]: true };
      }
    }
  }
  return dict;
};

//raises clicked div to top of rendered divs via add class 'on-top'
//all other divs affected, if in dom, have 'on-top' removed
//Not very elegant. I will try to find a better way to do this.
//unfortuanetly, with masonry-css, the parent div of the drag-groups
//are too large and invisible, affecting predicted behavior.
const setOnTopHelper = (containerName) => {
  const boardsContainer = document.getElementById('boards-folder-container');
  const welcomeContainer = document.getElementById('welcome-container');
  const aboutContainer = document.getElementById('about-container');
  if (containerName === 'welcome') {
    if (boardsContainer !== null) {
      boardsContainer.classList.remove('on-top');
    }
    if (aboutContainer !== null) {
      aboutContainer.classList.remove('on-top');
    }
    welcomeContainer.classList.add('on-top');
  } else if (containerName === 'boards') {
    if (welcomeContainer !== null) {
      welcomeContainer.classList.remove('on-top');
    }
    if (aboutContainer !== null) {
      aboutContainer.classList.remove('on-top');
    }
    boardsContainer.classList.add('on-top');
  } else if (containerName === 'about') {
    if (welcomeContainer !== null) {
      welcomeContainer.classList.remove('on-top');
    }
    if (boardsContainer !== null) {
      boardsContainer.classList.remove('on-top');
    }
    aboutContainer.classList.add('on-top');
  } else if (containerName === 'drag') {
    if (boardsContainer !== null) {
      boardsContainer.classList.remove('on-top');
    }
    if (aboutContainer !== null) {
      aboutContainer.classList.remove('on-top');
    }
    if (welcomeContainer !== null) {
      welcomeContainer.classList.remove('on-top');
    }
  }
};

export { breakpointColumnsObj, handleImageId, setOnTopHelper };
