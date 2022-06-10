export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_descr');

export const buttonAddCard = document.querySelector('.profile__add-button');
export const buttonEditAvatar = document.querySelector('.profile__avatar');

export const forms = Array.from(document.querySelectorAll('.popup__form'));
export const formEditProfile = forms[0];
export const formAddCard = forms[1];
export const formEditAvatar = forms[2];

export const formsData = {
    inputSelector: '.popup__inputs',
    inputItem: '.popup__input',
    button: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
};