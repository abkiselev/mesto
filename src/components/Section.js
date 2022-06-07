export class Section {
    constructor({ data, renderer }, containerSelector){
        // this._initialArray = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(cards){
        cards.forEach(item => {
            this._renderer(item)
        });
    }

    addItem(item){
        this._container.append(item)
    }
}