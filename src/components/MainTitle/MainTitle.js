import React from 'react';

export const MainTitle = ({ id, text }) => {
  return (
    <h2 className="maintitle" id={id}>{text}</h2>
  )
}

export default MainTitle;