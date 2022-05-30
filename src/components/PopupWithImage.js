import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector, { place, url }){
        super(popupSelector);
        this._place = place;
        this._url =  url;
    }

    open(){
        const popupFotoImg = this._popup.querySelector('.popup__img');
        const popupFotoName = this._popup.querySelector('.popup__text');
        
        popupFotoImg.src = this._url;
        popupFotoName.textContent = this._place;
        popupFotoImg.alt = this._place;
          
        this.setEventListeners();    
        this._popup.classList.add("popup_active");       
    }
}