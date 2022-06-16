import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit){
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._form.querySelectorAll('.popup__input');
        this._button = this._form.querySelector('.popup__button');
        this._formHandler = handleFormSubmit;
    }

    _getInputValues(){
        this._inputValues = {};
        this._inputs.forEach(input => this._inputValues[input.name] = input.value);   
        return this._inputValues;
    }

    toggleButtonText(text){
        this._button.textContent = text;
    }

    close(){
        super.close();
        this._form.reset();
    }

    setEventListeners(){
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {  
            evt.preventDefault();   
            this.toggleButtonText('Сохранение...');
            this._formHandler(this._getInputValues());
        });
    }
}