import React from 'react'
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    React.useEffect(() => {
        if (props.isOpen) document.addEventListener('keydown', props.onEscClick)
        return () => {
            document.removeEventListener('keydown', props.onEscClick)
        }
    }, [props.isOpen])

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
          name,
          about: description,
        });
      }

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    return (
        <div
            className={props.isOpen ? "popup popup_opened" : "popup"}
            id={`editProfile`}
        >
            <div className="popup__content">
                <button
                    className="popup__close"
                    type="button"
                    onClick={props.onClose}
                />
                <h2 className="popup__title">Редактировать профиль</h2>
                <form className="popup__form" onSubmit={handleSubmit} noValidate>
                    <input
                        value={name || ''}
                        onChange={handleChangeName}
                        id="name-card"
                        type="text"
                        name="name"
                        className="popup__input popup__input_type_name"
                        minLength={2}
                        maxLength={40}
                        required
                        placeholder="Имя"
                    />
                    <span
                        id="name-card-error"
                        className="popup__form-type-error popup__form-error-name"
                    ></span>
                    <input
                        value={description || ''}
                        onChange={handleChangeDescription}
                        id="text-card"
                        type="text"
                        name="about"
                        className="popup__input popup__input_type_text"
                        minLength={2}
                        maxLength={200}
                        required
                        placeholder="Профессия"
                    />
                    <span
                        id="text-card-error"
                        className="popup__form-type-error popup__form-error-text"
                    ></span>
                    <button
                        id={props.idButton}
                        onClick={props.onClickButton}
                        type="submit"
                        className="popup__button"
                    >
                        Сохранить
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditProfilePopup