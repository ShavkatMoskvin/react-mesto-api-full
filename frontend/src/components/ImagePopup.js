import React from "react";

function ImagePopup(props) {
  React.useEffect(() => {
    if (props.card.opened) document.addEventListener('keydown', props.onEscClick)
    return () => {
      document.removeEventListener('keydown', props.onEscClick)
    }
  }, [props.card.opened])

    return(
        <div id="openImage" className={props.card.opened ? 'popup popup_opened' : 'popup'}>
        <div className="popup__content popup__content_type-image">
          <img src={props.card.link} className="popup__image" />
          <h2 className="popup__image-title">{props.card.name}</h2>
          <button type="button" onClick={props.onClose} className="popup__close"></button>
        </div>
       
      </div>
    ) 
}

export default ImagePopup