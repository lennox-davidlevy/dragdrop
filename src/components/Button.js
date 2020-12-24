import React from 'react';

const Button = ({ clickHandler, item, title }) => {
  return <div onClick={() => clickHandler(item)}>{title}</div>;
};

export default Button;
