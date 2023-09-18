import { MOVIES_URL, BASE_URL } from './constants';

async function checkRequest(res) {
  if (res.ok) {
    return res.json();
  }
  // return Promise.reject(`Ошибка: ${res.status}. ${(await res.json()).message }`);
  return Promise.reject({
    status: `Ошибка: ${res.status}`,
    message: `${(await res.json()).message}`
  });
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
  }).then(res => checkRequest(res));
};

// авторизация пользователя
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  }).then(res => checkRequest(res));
};

// проверка токена
export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then(res => checkRequest(res));
};

// выход из системы
export const logOut = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then(res => checkRequest(res));
};

// загрузка данных пользователя
export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then(res => checkRequest(res));
};

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
  }).then(res => checkRequest(res));
};

export const saveMovie = movie => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `${MOVIES_URL}${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `${MOVIES_URL}${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN
    })
  }).then(res => checkRequest(res));
};

export const deleteMovie = movieId => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
};

export const getMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then(res => checkRequest(res));
};
