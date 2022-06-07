export class UserInfo {
    constructor({ nameSelector, infoSelector, avatarSelector}){
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo(){
        return {
            name: this._name.textContent,
            info: this._info.textContent,
        }
    }


    setUserInfo({name, about}){
        this._name.textContent = name;
        this._info.textContent = about;
    }

    setUserAvatar({avatar}){
        this._avatar.src = avatar;
    }
}

