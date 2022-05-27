import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector, { place, url }){
        super(popupSelector);
        this._place = place;
        this._url = url;
    }

    // _handleEscClose(event){
    //     if (event.key === 'Escape'){
    //         this.close();
    //     };
    // }

    // setEventListeners(){
    //     this._popup.querySelector('.popup__close').addEventListener('click', () => {
    //         this.close();
    //     });

    //     this._popup.querySelector('.popup__bg').addEventListener('click', () => {
    //         this.close();
    //     });        
    //     document.addEventListener('keydown', (event) => {
    //         this._handleEscClose(event);
    //     }, { once: true }); 
    // }

    open(){
        const popupFotoImg = this._popup.querySelector('.popup__img');
        const popupFotoName = this._popup.querySelector('.popup__text');
        popupFotoImg.src = this._url;
        popupFotoName.textContent = this._place;
        popupFotoImg.alt = this._place;
          
        this.setEventListeners();    
        this._popup.classList.add("popup_active");       
    }

    // close(){
    //     this._popup.classList.remove("popup_active");
    // }

}