export class Section {
    constructor({ data, renderer }, containerSelector){
        // this._initialArray = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(cards, userId){
        cards.forEach(item => {
            this._renderer(item, userId)
        });
    }

    addItem(item){
        // console.log(item)
        this._container.prepend(item)
    }
}