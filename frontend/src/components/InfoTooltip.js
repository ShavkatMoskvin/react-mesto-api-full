import React from 'react';
import successIco from '../images/success-ico.svg';
import failIco from '../images/fail-ico.svg';

function InfoTooltip(props) {

    return (
        <div className={props.isOpen ? "popup popup_opened" : "popup"}>
            <div className={`popup__content`}>
                <div className="infoTooltip">
                    <button
                        className="popup__close"
                        type="button"
                        onClick={props.onClose}
                    />
                    <img className="infoTooltip__image" src={props.status ? successIco : failIco} />
                    <p className="infoTooltip__text">
                        {props.status ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
                    </p>
                    <button type="button" className="popup__close popup__close-img" onClick={props.onClose} />
                </div>
            </div>
        </div>
    )
}
export default InfoTooltip