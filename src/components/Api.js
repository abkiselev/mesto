export class Api {
  constructor(options){
      this._url = options.baseUrl;
      this._authorization = options.headers.authorization;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization
      }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  createNewCard({name, link}) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } return Promise.reject(`Ошибка: ${res.status}`);
    })

  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
      }
    })
  }


  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization
      }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } return Promise.reject(`Ошибка: ${res.status}`);
      })
    
  }

  changeProfileInfo({name, about}) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } return Promise.reject(`Ошибка: ${res.status}`);
    })

  }

  changeProfileAvatar({avatar}) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } return Promise.reject(`Ошибка: ${res.status}`);
    })

  }

  setCardLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      }
    })
  }


  
  
}


