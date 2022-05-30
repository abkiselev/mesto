export class Popup {
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector)
    }

    _handleEscClose(event){
        if (event.key === 'Escape'){
            this.close();
        };
    }

    setEventListeners(){
        this._popup.querySelector('.popup__close').addEventListener('click', () => {
            this.close();
        });

        this._popup.querySelector('.popup__bg').addEventListener('click', () => {
            this.close();
        });        
        document.addEventListener('keydown', (event) => {
            this._handleEscClose(event);
        }, { once: true }); 
    }

    open(){
        // this.setEventListeners();      
        this._popup.classList.add("popup_active");       
    }

    close(){
        this._popup.classList.remove("popup_active");
    }

}