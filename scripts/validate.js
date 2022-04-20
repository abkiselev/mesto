activateValidation ({
  formSelector: '.popup__form',
  inputSelector: '.popup__inputs',
  inputItem: '.popup__input',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
});


function activateValidation (data){
  const forms = Array.from(document.querySelectorAll(data.formSelector));
  
  forms.forEach(function(form){
      form.addEventListener('submit', function(event){
          event.preventDefault();
      });
      
      const inputs = Array.from(form.querySelectorAll(data.inputSelector)); 
      
      inputs.forEach((fieldSet) => {
          setListeners(fieldSet, data);
        }); 

  });
};


function setListeners(fieldSet, data){
  const inputFields = Array.from(fieldSet.querySelectorAll(data.inputItem));
  const button = fieldSet.nextElementSibling;
  toggleButtonState(inputFields, button, data);

  inputFields.forEach(function(inputField){
      inputField.addEventListener('input', function(){
        checkInputValidity(fieldSet, inputField, data)
        toggleButtonState(inputFields, button, data)
      });
  });
};


function checkInputValidity(fieldSet, inputField, data){
  if (!inputField.validity.valid) {
    showError(fieldSet, inputField, inputField.validationMessage, data);
  } 
  else {
    hideError(fieldSet, inputField, data);
  };
};


function showError(fieldSet, inputField, errorMessage, data){
  const inputError = fieldSet.querySelector(`.${inputField.id}-error`);
  inputField.classList.add(data.inputErrorClass);
  inputError.textContent = errorMessage;
};


function hideError(fieldSet, inputField, data){
  const inputError = fieldSet.querySelector(`.${inputField.id}-error`);
  inputField.classList.remove(data.inputErrorClass);
  inputError.textContent = '';
};


function toggleButtonState(inputFields, button, data){
  if (hasInvalidInput(inputFields)) {
    button.classList.add(data.inactiveButtonClass);
  } 
  else {
    button.classList.remove(data.inactiveButtonClass);
  };
};


function hasInvalidInput(inputFields, data){
  return inputFields.some(function(inputField){
    return !inputField.validity.valid;
  }); 
};