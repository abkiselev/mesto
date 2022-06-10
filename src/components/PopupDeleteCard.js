import { Popup } from './Popup.js';

export class PopupDeleteCard extends Popup {
    constructor(popupSelector, handleFormSubmit){
        super(popupSelector);
        this._button = this._popup.querySelector('.popup__button');
        this._formHandler = handleFormSubmit;
    }

    _deleteCard(newCard){
        this._formHandler(newCard)
    }

    toggleButtonText(){
        if(this._button.textContent === 'Да'){
            this._button.textContent = 'Удаление...';
        }
        else if(this._button.textContent === 'Удаление...'){
            this._button.textContent = 'Да';
        }
    }


    open(newCard){
        this._button.addEventListener('click', (evt) => {  
            evt.preventDefault();  
            this.toggleButtonText();
            this._deleteCard(newCard);
        }, { once: true });

        super.open();
    }

}