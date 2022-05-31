export class Popup {
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector)
    }

    _handleEscClose(event){
        if (event.key === 'Escape'){
            this.close();
            console.log('1111')
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
        document.addEventListener('keydown', (event) => {
            this._handleEscClose(event);
        }, {once: true});    
    }

    close(){
        this._popup.classList.remove("popup_active");
    }

}