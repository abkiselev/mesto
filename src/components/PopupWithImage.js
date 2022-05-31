import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
    }

    open(place, url){
        const popupFotoImg = this._popup.querySelector('.popup__img');
        const popupFotoName = this._popup.querySelector('.popup__text');
        
        popupFotoImg.src = url;
        popupFotoName.textContent = place;
        popupFotoImg.alt = place;
          
        super.setEventListeners();    
        super.open();       
    }
}