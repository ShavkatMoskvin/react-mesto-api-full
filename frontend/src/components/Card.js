import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext)

  const isLiked = props.likes.some(i => i._id === currentUser._id);
  const isOwn = props.owner._id === currentUser._id;

  const handleCardClick = () => props.onCardClick(props);
  const handleCardLike = () => props.onCardLike(props.card);
  const handleCardDelete = () => props.onCardDelete(props.card)

  return (
    <article className="element">
      {isOwn && <button type="button" onClick={handleCardDelete} className="element__trash" />}
      <img
        onClick={handleCardClick}
        className="element__image"
        alt={props.name}
        src={props.link}
      />
      <div className="element__title-container">
        <h2 className="element__title">{props.name}</h2>
        <div>
          {isLiked ? <button type="button" onClick={handleCardLike} className="element__like element__like_active"></button> : <button type="button" onClick={handleCardLike} className="element__like"></button>}
          <p className="element__counter">{props.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
