export class Popup {
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    _handleEscClose(event){
        if (event.key === 'Escape'){
            this.close();
        };
    }

    setEventListeners(){
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup__bg') || evt.target.classList.contains('popup__close')) {
                this.close();
            }
        }); 

        
    }

    open(){   
        this._popup.classList.add("popup_active");
        document.addEventListener('keydown', this._handleEscClose); 
    }

    close(){
        this._popup.classList.remove("popup_active");
        document.removeEventListener('keydown', this._handleEscClose);
    }

}