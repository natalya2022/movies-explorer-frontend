import React from 'react';

const ButtonUniversal = (props) => {  
   
  // функция для проверки работы кнопок в макете
  const checkButton = (evt) => evt.target.classList.toggle(props.classNameActive);
  
  return (
    <button className={props.className} type={props.type} onClick={props.onClick ? props.onClick : checkButton}>{props.buttonText}</button>
  )
}

export default ButtonUniversal;