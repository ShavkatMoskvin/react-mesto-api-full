import React from "react";
import Card from "./Card";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  
  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-edit" style={{ position: "relative" }}>
          <img
            src={`${currentUser.avatar}`}
            alt={`${currentUser.name}`}
            className="profile__avatar"
          />
          <button
            title="Загрузить новый аватар"
            className="profile__avatar-edit-button"
            onClick={props.handleEditAvatarClick}
          />
        </div>
        <div className="profile__info">
          <div className="profile__title-container">
            <h1 className="profile__title">{`${currentUser.name}`}</h1>
            <button
              onClick={props.handleEditProfileClick}
              type="button"
              className="profile__edit-button"
            />
          </div>
          <p className="profile__subtitle">{`${currentUser.about}`}</p>
        </div>
        <button
          onClick={props.handleAddCardClick}
          type="button"
          className="profile__add-button"
        />
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            {...card}
            onCardLike={props.onCardLike}
            onCardClick={props.handleCardClick}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
export default Main;
