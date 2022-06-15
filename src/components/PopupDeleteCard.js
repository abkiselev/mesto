import { Popup } from './Popup.js';

export class PopupDeleteCard extends Popup {
    constructor(popupSelector, handleFormSubmit){
        super(popupSelector);
        this._button = this._popup.querySelector('.popup__button');
        this._formHandler = handleFormSubmit;
    }

    _deleteCard(){
        this._formHandler(this._cardToDelete)
    }

    toggleButtonText(){
        if(this._button.textContent === 'Да'){
            this._button.textContent = 'Удаление...';
        }
        else if(this._button.textContent === 'Удаление...'){
            this._button.textContent = 'Да';
        }
    }

    setCardtoDelete(newCard){
        this._cardToDelete = newCard;
    }


    open(){
        this._button.addEventListener('click', (evt) => {  
            evt.preventDefault();  
            this.toggleButtonText();
            this._deleteCard();
        });

        super.open();
    }

}