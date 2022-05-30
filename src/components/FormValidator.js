export const formsData = {
  inputSelector: '.popup__inputs',
  inputItem: '.popup__input',
  button: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
};


export class FormValidator {
  constructor(formsData, formSelector){
    this._formSelector = formSelector;
    this._inputSelector = formsData.inputSelector;
    this._inputItem = formsData.inputItem;
    this._button = formsData.button;
    this._inactiveButtonClass = formsData.inactiveButtonClass;
    this._inputErrorClass = formsData.inputErrorClass;
  }

  _setListeners(currentForm){
    currentForm.addEventListener('submit', function(event){
      event.preventDefault();
    });
        
    currentForm.querySelectorAll(this._inputItem).forEach((inputField) => {
        inputField.addEventListener('input', () => {
          this._checkInputValidity(currentForm, inputField);
          this._toggleButtonState(currentForm, inputField);
        });
    });
  }

  _checkInputValidity(currentForm, inputField){
    if (!inputField.validity.valid) {
      this._showError(currentForm, inputField, inputField.validationMessage);
    } 
    else {
      this._hideError(currentForm, inputField);
    };
  }
  
  
  _showError(currentForm, inputField, errorMessage){
    const inputError = currentForm.querySelector(`.${inputField.id}-error`);
    inputField.classList.add(this._inputErrorClass);
    inputError.textContent = errorMessage;
  }
  
  
  _hideError(currentForm, inputField){
    const inputError = currentForm.querySelector(`.${inputField.id}-error`);
    inputField.classList.remove(this._inputErrorClass);
    inputError.textContent = '';
  }
  
  
  _toggleButtonState(currentForm, inputField){
    const fieldSet = Array.from(currentForm.querySelectorAll(this._inputItem));

    const button = currentForm.querySelector(this._button);

    if (this._hasInvalidInput(fieldSet, inputField)) {
      button.classList.add(this._inactiveButtonClass);
    } 
    else {
      button.classList.remove(this._inactiveButtonClass);
    };
  }
  
  
  _hasInvalidInput(fieldSet, inputField){
    return fieldSet.some((inputField) => {
      return !inputField.validity.valid;
    }); 
  }


  activateValidation (){
    const currentForm = document.querySelector(`.${this._formSelector}`);
    this._setListeners(currentForm);
    this._toggleButtonState(currentForm);
  }
}
