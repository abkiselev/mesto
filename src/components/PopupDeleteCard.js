import { Popup } from './Popup.js';

export class PopupDeleteCard extends Popup {
    constructor(popupSelector, handleFormSubmit){
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._button = this._popup.querySelector('.popup__button');
        this._formHandler = handleFormSubmit;
    }

    _deleteCard(){
        this._formHandler(this._cardToDelete)
    }

    toggleButtonText(text){
        this._button.textContent = text;
    }

    setCardtoDelete(newCard){
        this._cardToDelete = newCard;
    }


    setEventListeners(){
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {  
            evt.preventDefault();  
            this.toggleButtonText('Удаление...');
            this._deleteCard();
        });
    }

}