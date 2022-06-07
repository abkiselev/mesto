export class Card {
  constructor({ card, temlateSelector, handleCardClick, handleCardLike }){
      this._place = card.name;
      this._url = card.link;
      this._id = card._id;
      this._ownerId = card.owner._id;
      this._likesList = card.likes;
      this._likesCounter = card.likes.length;
      this._template = temlateSelector;
      this._handleCardClick = handleCardClick;
      this._handleCardLike = handleCardLike;
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
    this._handleCardLike(this._id);
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

  remove(){
    this._remove();
  }

  generateCard(){
    this._element = this._getTemplate();
    this._setListeners();

    this._element.querySelector('.card__like-counter').textContent = this._likesCounter;
    this._element.querySelector('.card__img').src = this._url;
    this._element.querySelector('.card__title').textContent = this._place;
    // console.log(this._ownerId)
    // this._likesList.forEach(item => {
    //   if(item._id = this._ownerId){
    //     console.log(item)
    //   }
    // })

    return this._element;
  }
}


