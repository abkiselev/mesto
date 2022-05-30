// import { openPopup } from './index.js';

export class Card {
  constructor({ card, temlateSelector, handleCardClick }){
      this._place = card.place;
      this._url = card.url;
      this._template = temlateSelector;
      this._handleCardClick = handleCardClick;
  }

  _getTemplate(){
    const cardTemplate = document
                        .querySelector(this._template)
                        .content
                        .querySelector('.card')
                        .cloneNode(true);

    return cardTemplate;
  }


  _likeCard(){
    this._element.querySelector('.card__like-button').classList.toggle("card__like-button_active");
  }

  _setListeners(){
    this._element.querySelector('.card__img').addEventListener('click', () => {
        // const popupWithFoto = document.querySelector('#foto-popup');
        // const popupFotoImg = popupWithFoto.querySelector('.popup__img');
        // const popupFotoName = popupWithFoto.querySelector('.popup__text');
        // popupFotoImg.src = this._url;
        // popupFotoName.textContent = this._place;
        // popupFotoImg.alt = this._place;
        // openPopup(popupWithFoto);
        // console.log(this._handleCardClick)
        this._handleCardClick(this._place, this._url); 
    });

    this._element.querySelector('.card__trash-button').addEventListener('click', () => {
        this._element.remove();
    });

    this._element.querySelector('.card__like-button').addEventListener('click', () => {
        this._likeCard();
    });
  }

  // handleCardClick(){
  //   this.open()
  // }

  generateCard(){
    this._element = this._getTemplate();
    this._setListeners();

    this._element.querySelector('.card__img').src = this._url;
    this._element.querySelector('.card__title').textContent = this._place;

    return this._element;
  }
}


