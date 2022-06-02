import formsData from '../utils/constants.js';


export class FormValidator {
  constructor(formsData, formSelector){
    this._formSelector = formSelector;
    this._inputSelector = formsData.inputSelector;
    this._inputItem = formsData.inputItem;
    this._button = formsData.button; 
    this._inactiveButtonClass = formsData.inactiveButtonClass;
    this._inputErrorClass = formsData.inputErrorClass;
    this._currentForm = document.querySelector(`.${formSelector}`);
    this._fieldSet = Array.from(this._currentForm.querySelectorAll(formsData.inputItem));
    this._button = this._currentForm.querySelector(formsData.button);
  }

  _setListeners(){
    this._currentForm.addEventListener('submit', function(event){
      event.preventDefault();
    });
        
    this._currentForm.querySelectorAll(this._inputItem).forEach((inputField) => {
        inputField.addEventListener('input', () => {
          this._checkInputValidity(inputField);
          this._toggleButtonState();
        });
    });
  }

  _checkInputValidity(inputField){
    if (!inputField.validity.valid) {
      this._showError(inputField, inputField.validationMessage);
    } 
    else {
      this._hideError(inputField);
    };
  }
  
  
  _showError(inputField, errorMessage){
    const inputError = this._currentForm.querySelector(`.${inputField.id}-error`);
    inputField.classList.add(this._inputErrorClass);
    inputError.textContent = errorMessage;
  }
  
  _hideError(inputField){
    const inputError = this._currentForm.querySelector(`.${inputField.id}-error`);
    inputField.classList.remove(this._inputErrorClass);
    inputError.textContent = '';
  }
  
  _toggleButtonState(){
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._inactiveButtonClass);
      this._button.setAttribute('disabled', true);
      
    } 
    else {
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.removeAttribute('disabled');
    };
  }
  
  
  _hasInvalidInput(){
    return this._fieldSet.some((inputField) => {
      return !inputField.validity.valid;
    }); 
  }


  hideError(inputField){
    this._hideError(inputField);
  }

  disableSubmitButton(){
    this._toggleButtonState();
  }

  activateValidation (){
    this._setListeners();
    this._toggleButtonState();
  }
}
