import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit){
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._form.querySelectorAll('.popup__input');
        this._formHandler = handleFormSubmit;
    }

    _getInputValues(){
        const inputValues = [];
        this._inputs.forEach(item => {
            inputValues.push(item.value)
        });
        
        return inputValues
    }

    setEventListeners(){
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {  
            evt.preventDefault();   
            this._formHandler(this._getInputValues());
            
            this.close();
        });
    }
}