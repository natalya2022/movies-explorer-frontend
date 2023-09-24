import { MOVIES_URL } from './constants';

function checkRequest(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// загрузка фильмов
export const getMovies = () => {
  return fetch(`${MOVIES_URL}/beatfilm-movies`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => checkRequest(res));
};
