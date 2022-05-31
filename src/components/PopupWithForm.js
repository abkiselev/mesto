import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit){
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._form.querySelectorAll('.popup__input');
        this._formHandler = handleFormSubmit;
    }

    _getInputValues(){
        const inputValues = {};
        inputValues.name = this._inputs[0].value;
        inputValues.info =  this._inputs[1].value;
        
        return inputValues
    }

    close(){
        super.close();
        this._form.reset();
        this._form.querySelector('.popup__button').classList.add('popup__button_disabled');
        this._form.querySelector('.popup__button').setAttribute('disabled', true);
    }

    setEventListeners(){
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {  
            evt.preventDefault();   
            this._formHandler(this._getInputValues());
        });
    }
}