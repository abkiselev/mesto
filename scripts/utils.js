function openPopup(popupActiveElement) {
    popupActiveElement.classList.add("popup_active");
    document.addEventListener('keydown', closePopupOnEscape)
};

function closePopup() {
    document.querySelector('.popup_active').classList.remove("popup_active");
    document.removeEventListener('keydown', closePopupOnEscape);
};

function closePopupOnEscape(event){
    if (event.key === 'Escape'){
        closePopup()
    };
};


export { openPopup, closePopup };