export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type-error",
  errorClass: "form__input-error_active",
};
export const popupAddCard = document.querySelector("#addCard"); //попап добавления карточки
export const openImage = document.querySelector("#openImage"); //попап просмотра картинки
export const popupProfileForm = document.querySelector("#editProfile"); //попап формы
export const inputTypeName = document.querySelector(".popup__input_type_name"); //инпут формы личных данных
export const inputTypeText = document.querySelector(".popup__input_type_text"); //инпут формы личных данных
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const profileAddButton = document.querySelector(".profile__add-button");
export const profileName = document.querySelector(".profile__title");
export const nameText = document.querySelector(".profile__subtitle");
export const elements = document.querySelector(".elements"); //контейнер для карточек
export const popupImageTitle = document.querySelector(".popup__image-title"); //подпись изображения попапа просмотра картинки
export const popupDelete = document.querySelector("#deleteCard")
export const popupDeleteForm = document.querySelector("#deleteForm")
export const profileAvatar = document.querySelector(".profile__avatar")
export const popupEditAvatar = document.querySelector("#editAvatar")
export const profileChangeButton = document.querySelector(".profile__avatar-edit-button")