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

  _remove(){
    this._element.remove();
    this._element = null;
  }

  _likeCard(){
    this._element.querySelector('.card__like-button').classList.toggle("card__like-button_active");
  }

  _setListeners(){
    this._element.querySelector('.card__img').addEventListener('click', () => {
        this._handleCardClick(this._place, this._url); 
    });

    this._element.querySelector('.card__trash-button').addEventListener('click', () => {
        this._remove();
    });

    this._element.querySelector('.card__like-button').addEventListener('click', () => {
        this._likeCard();
    });
  }

  generateCard(){
    this._element = this._getTemplate();
    this._setListeners();

    this._element.querySelector('.card__img').src = this._url;
    this._element.querySelector('.card__title').textContent = this._place;

    return this._element;
  }
}


