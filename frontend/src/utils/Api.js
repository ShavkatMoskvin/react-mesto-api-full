const token = localStorage.getItem('jwt')

class Api {
  constructor({ address, token, url }) {
    this._address = address;
    this._token = token;
    this._url = address;
  }

  register = (password, email) => {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    })
      .then(this._handleOriginalResponse)
  };

  authorization = (password, email) => {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": password,
        "email": email,
      })
    })
      .then(this._handleOriginalResponse)
  }

  validityToken(token){
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
      .then(this._handleOriginalResponse)
  }

  likeCard(id) {
    return fetch(`${this._address}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    }).then(this._handleOriginalResponse)
  }

  dislikeCard(id) {
    return fetch(`${this._address}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    }).then(this._handleOriginalResponse)
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json; charset=utf-8"
      }
    }).then(this._handleOriginalResponse)
  }

  setUserInfo(data) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then(this._handleOriginalResponse)
  }

  setUserAvatar(data) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this._handleOriginalResponse)
  }

  getInitialData() {
    return Promise.all([this.getUserInfo(), this.getCards()]);
  }

  getCards() {
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._handleOriginalResponse);
  }

  addCard(data) {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      }),
    }).then(this._handleOriginalResponse);
  }

  deleteCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-type": "application/json",
      },
    }).then(this._handleOriginalResponse);
  }

  _handleOriginalResponse(res) {
    if (res.ok) {
      return res.json();
      
    }
    return Promise.reject(`ошибка:${res.status}`);
  }
}

const api = new Api({
  address: "https://api.moskvin.nomoreparties.sbs",
  token: `Bearer ${token}`,
});

export default api