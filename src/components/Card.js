export class Card {
  constructor({ card, userId, temlateSelector, handleCardClick, handleCardLike, handleCardDelete }){
      this._place = card.name;
      this._url = card.link;
      this._id = card._id;
      this._cardOwnerId = card.owner._id;
      this._userId = userId;
      this._likesList = card.likes;
      this._likesCounter = card.likes.length;
      this._template = temlateSelector;

      this._element = this._getTemplate();
      this._buttonLike = this._element.querySelector('.card__like-button');
      this._buttonDelete = this._element.querySelector('.card__trash-button');
      this._cardImage = this._element.querySelector('.card__img');
      this._cardTitle = this._element.querySelector('.card__title');
      this._cardLikeCounterText = this._element.querySelector('.card__like-counter');

      this._handleCardClick = handleCardClick;
      this._handleCardDelete = handleCardDelete;
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


  remove(){
    this._element.remove();
    this._element = null;
  }

  _checkCardOwner(){
    return this._cardOwnerId === this._userId;
  }

  _checkLikeStatus(){
    return this._likesList.some(item => item._id === this._userId);
  }

  _toggleLikeButton(){
    if(this._checkLikeStatus()){
      this._buttonLike.classList.add("card__like-button_active");
    } else {
      this._buttonLike.classList.remove("card__like-button_active");
    };
  }

  setLikeCounter(data){
    this._likesList = data.likes;
    this._likesCounter = data.likes.length;

    this._toggleLikeButton();
    
    this._cardLikeCounterText.textContent = this._likesCounter;
  }

  _likeCard(){
    if(!this._checkLikeStatus()){
      this._handleCardLike(this._id, 'PUT');
    } 
    else if (this._checkLikeStatus()){
      this._handleCardLike(this._id, 'DELETE');
    }
  }

  
  _setListeners(){
    this._cardImage.addEventListener('click', () => {
        this._handleCardClick(this._place, this._url); 
    });

    if(this._checkCardOwner()){
        this._buttonDelete.addEventListener('click', () => {
      
        this._handleCardDelete(this)
      });
    }    

    this._buttonLike.addEventListener('click', () => {
        this._likeCard();
    });
  }

  generateCard(data){
    this._cardImage.src = this._url;
    this._cardImage.alt = this._place;
    this._cardTitle.textContent = this._place;
    
    if(!this._checkCardOwner()){
      this._buttonDelete.classList.add('card__trash-button_no-active');      
    };

    this.setLikeCounter(data)

    this._setListeners();

    return this._element;
  }
}


