import React from 'react';

const InfoTooltip = ({ onClose, toooltipMessage, isOpen }) => {

  React.useEffect(() => {
    if(!isOpen) return;
    const handleEscapeClose = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscapeClose);
    return () => {
      document.removeEventListener('keydown', handleEscapeClose);
    };
  }, [isOpen, onClose]);
  
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>      
      <div className="popup__container popup_type_register" onClick={(e) => e.stopPropagation()}>
        <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose} />        
        <img className="popup__image" src={toooltipMessage.link} alt="Информация" />
        <h2 className="popup__tooltip">{toooltipMessage.text}</h2>
      </div>
    </div>
  );
};

export default InfoTooltip;
