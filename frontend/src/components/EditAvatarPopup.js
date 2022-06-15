import React from 'react'

function EditAvatarPopup(props) {
    const avatarInputRef = React.useRef(null);

    React.useEffect(() => {
        avatarInputRef.current.value=""
    }, [props.isOpen, avatarInputRef]);

    React.useEffect(() => {
        if (props.isOpen) document.addEventListener('keydown', props.onEscClick)
        return () => {
            document.removeEventListener('keydown', props.onEscClick)
        }
    }, [props.isOpen])

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarInputRef.current.value,
        });
    }

    return (
        <div
            className={props.isOpen ? "popup popup_opened" : "popup"}
            id={`editAvatar`}
        >
            <div className="popup__content">
                <button
                    className="popup__close"
                    type="button"
                    onClick={props.onClose}
                />
                <h2 className="popup__title">Обновить аватар</h2>
                <form className="popup__form" onSubmit={handleSubmit} noValidate>
                    <input
                        defaultValue=''
                        ref={avatarInputRef}
                        id="avatar-card"
                        type="url"
                        name="avatar"
                        className="popup__input popup__input_type_text"
                        placeholder="Ссылка на картину"
                        required
                    />
                    <span
                        id="avatar-card-error"
                        className="popup__form-type-error popup__form-error-avatar"
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

export default EditAvatarPopup