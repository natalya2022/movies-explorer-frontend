export default class Api {
    constructor(apiParams) {
        this._baseUrl = apiParams.baseUrl;
        this._headers = apiParams.headers;
    }

    _checkRequest(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _request(endpoint, options) {
        return fetch(`${this._baseUrl}${endpoint}`, options).then(res => this._checkRequest(res));
    }

    getInitialCards() {
        return this._request(`/cards`, {
            credentials: 'include',
            headers: this._headers,
        });
    }
};

const apiParams = {
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    // baseUrl: process.env.NODE_ENV === 'production' ? 'https://api.places.nomoreparties.co' : 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
};


export const api = new Api(apiParams);
