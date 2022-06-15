import React from "react";

function AddPlacePopup(props) {
    const [name, setName] = React.useState('')
    const [link, setLink] = React.useState('')

    React.useEffect(() => {
        if (props.isOpen) document.addEventListener('keydown', props.onEscClick)
        return () => {
            document.removeEventListener('keydown', props.onEscClick)
        }
    }, [props.isOpen])

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddCard({
            name: name,
            link: link
        });
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    return (
        <div
            className={props.isOpen ? "popup popup_opened" : "popup"}
            id={`addCard`}
        >
            <div className="popup__content">
                <button
                    className="popup__close"
                    type="button"
                    onClick={props.onClose}
                />
                <h2 className="popup__title">Новое место</h2>
                <form className="popup__form" onSubmit={handleSubmit} noValidate>
                    <input
                        onChange={handleChangeName}
                        value={name}
                        id="title-card"
                        type="text"
                        name="name"
                        className="popup__input popup__input_type_name"
                        placeholder="Название"
                        minLength={2}
                        maxLength={30}
                        required
                    />
                    <span
                        id="title-card-error"
                        className="popup__form-type-error popup__form-error-title"
                    ></span>
                    <input
                        onChange={handleChangeLink}   
                        value={link}                     
                        id="link-card"
                        type="url"
                        name="link"
                        className="popup__input popup__input_type_text"
                        placeholder="Ссылка на картину"
                        required
                    />
                    <span
                        id="link-card-error"
                        className="popup__form-type-error popup__form-error-link"
                    ></span>
                    <button
                        id={props.idButton}
                        onClick={props.onClickButton}
                        type="submit"
                        className="popup__button"
                    >
                        Добавить
                    </button>
                </form>
            </div>
        </div>
    )
}
export default AddPlacePopup