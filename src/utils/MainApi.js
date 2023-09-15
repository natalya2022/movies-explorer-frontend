export const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://api.movieinfo.nomoredomainsicu.ru' : 'http://localhost:3000';

function checkRequest(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

// регистрация пользователя
export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, password })
    })
        .then(res => checkRequest(res));
};

// авторизация пользователя
export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
    })
        .then(res => checkRequest(res));
};

// проверка токена
export const checkToken = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(res => checkRequest(res));
};

// выход из системы
export const logOut = () => {
    return fetch(`${BASE_URL}/signout`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(res => checkRequest(res));
};

// загрузка данных пользователя
export const getUserInfo = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(res => checkRequest(res));
}

// редактирование профиля
export const editUserProfile = ({ name, email }) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            name: name,
            email: email
        })
    })
        .then(res => checkRequest(res));
}