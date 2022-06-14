import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._popupFotoImg = this._popup.querySelector('.popup__img');
        this._popupFotoName = this._popup.querySelector('.popup__text');
    }

    open(place, url){        
        this._popupFotoImg.src = url;
        this._popupFotoName.textContent = place;
        this._popupFotoImg.alt = place;
          
        super.open();       
    }
}