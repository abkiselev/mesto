import { Popup } from './Popup.js';

export class PopupDeleteCard extends Popup {
    constructor(popupSelector, handleFormSubmit){
        super(popupSelector);
        this._button = this._popup.querySelector('.popup__button');
        // this._inputs = this._form.querySelectorAll('.popup__input');
        this._formHandler = handleFormSubmit;
    }

    _deleteCard(id){
        this._formHandler(id)
    }

    close(){
        super.close();
        this._form.reset();
    }

    setEventListeners(){
        super.setEventListeners();

        this._button.addEventListener('click', (evt) => {  
            evt.preventDefault();   
            this._deleteCard(id);
        });
    }
}