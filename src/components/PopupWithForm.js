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
        const inputValues = {};
        if(this._inputs.length > 1){
            inputValues.name = this._inputs[0].value;
            inputValues.info = this._inputs[1].value;
        } inputValues.name = this._inputs[0].value;

        return inputValues
    }

    close(){
        super.close();
        this._form.reset();
    }

    setEventListeners(){
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {  
            evt.preventDefault();   
            this._button.textContent = 'Сохранение...';
            this._formHandler(this._getInputValues());
            this._button.textContent = 'Сохранить';
        });
    }
}