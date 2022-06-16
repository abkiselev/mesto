export class Api {
  constructor({ baseUrl, headers }){
      this._url = baseUrl;
      this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
      })
      .then(res => this._getResponseData(res))
  }

  createNewCard({name, link}) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(res => this._getResponseData(res))
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._getResponseData(res))
  }


  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
      })
      .then(res => this._getResponseData(res))
  }

  changeProfileInfo({name, about}) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(res => this._getResponseData(res))
  }

  changeProfileAvatar({avatar}) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then(res => this._getResponseData(res))
  }

  setCardLike(cardId, method) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: method,
      headers: this._headers
    })
    .then(res => this._getResponseData(res))
  }
  
}


