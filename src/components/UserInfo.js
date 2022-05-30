export class UserInfo {
    constructor({ nameSelector, infoSelector}){
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
    }

    getUserInfo(){
        return {
            name: this._name.textContent,
            info: this._info.textContent
        }
    }

    setUserInfo(values){
        this._name.textContent = values[0];
        this._info.textContent = values[1];
    }
}