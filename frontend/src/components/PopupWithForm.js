import React from "react";

function PopupWithForm(props) {
  React.useEffect(() => {
    if (props.isOpen) document.addEventListener('keydown', props.onEscClick)
    return () => {
      document.removeEventListener('keydown', props.onEscClick)
    }
  }, [props.isOpen])

  return (
    <div
      className={props.isOpen ? "popup popup_opened" : "popup"}
      id={`${props.id}`}
    >
      <div className="popup__content">
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        />
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" onSubmit={props.onSubmit} noValidate>
          {props.children}
          <button
            id={props.idButton}
            onClick={props.onClickButton}
            type="submit"
            className="popup__button"
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
