const initialCards = [
    {
      place: 'Архыз',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      place: 'Челябинская область',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      place: 'Иваново',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      place: 'Камчатка',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      place: 'Холмогорский район',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      place: 'Байкал',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; 

import { openPopup } from './index.js'

const cardsList = document.querySelector('.cards');

let popupWithFoto = document.querySelector('#foto-popup');
const popupFotoImg = popupWithFoto.querySelector('.popup__img');
const popupFotoName = popupWithFoto.querySelector('.popup__text');


class Card {
    constructor (card) {
        this._place = card.place;
        this._url = card.url;
    }

    _getTemplate() {
        const cardTemplate = document
                            .querySelector('#card-template')
                            .content
                            .querySelector('.card')
                            .cloneNode(true);
    
        return cardTemplate;
    }

 
    _likeCard() {
        this._element.querySelector('.card__like-button').classList.toggle("card__like-button_active");
    };

    _setListeners() {
        this._element.querySelector('.card__img').addEventListener('click', () => {
            popupFotoImg.src = this._url;
            popupFotoName.textContent = this._place;
            popupFotoImg.alt = this._place;
            openPopup(popupWithFoto);
        });

        this._element.querySelector('.card__trash-button').addEventListener('click', () => {
            this._element.remove();
        });

        this._element.querySelector('.card__like-button').addEventListener('click', () => {
            this._likeCard();
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setListeners();

        this._element.querySelector('.card__img').src = this._url;
        this._element.querySelector('.card__title').textContent = this._place;

        return this._element;
    }
}

initialCards.forEach(function(card){
    renderCard (card);
});

function renderCard (card) {
    const newCard = new Card(card);
    const cardElement = newCard.generateCard();
    cardsList.prepend(cardElement);
};

export { renderCard };

