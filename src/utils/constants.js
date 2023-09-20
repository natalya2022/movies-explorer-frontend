import regtrue from '../images/regtrue.svg';
import iconinfo from '../images/info_data_icon.svg';

export const MOVIES_URL = 'https://api.nomoreparties.co';
export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.movieinfo.nomoredomainsicu.ru'
    : 'http://localhost:3000';

export const countSelectorArray = [
  [629, 5, 2, 1],
  [989, 8, 2, 2],
  [1279, 12, 3, 3],
  [100000, 16, 4, 4]
];

// массив содержит элементы:
// 0 - max разрешение экрана при заданной раскладке карточек
export const COUNT_FIRST = 1; // 1 - кол-во карточек при первой выдаче на экран
export const COUNT_ADD = 2; // 2 - кол-во карточек при добавлении по кнопке
export const COUNT_LINE = 3; // 3 - кол-во карточек в одной строке

export const toolMessage = { ok: 0, err: 1, search: 2, noresult: 3, errLoading: 4, empty: 5 };
export const toolMessages = [
  { link: regtrue, text: 'Данные профиля изменены!' },
  { link: iconinfo, text: 'Что-то пошло не так! Попробуйте еще раз.' },
  { link: iconinfo, text: 'Нужно ввести ключевое слово!' },
  { link: iconinfo, text: 'Ничего не найдено!' },
  { link: iconinfo, text: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'},
  { link: iconinfo, text: 'Нужно добавить фильмы в избранное!' },
];

export const serverErrors = [
  'Ошибка при введении данных',
  'Фильма с таким id не существует',
  'Невозможно удалить чужой фильм',
  'Данный email уже зарегистрирован',
  'Ошибка при создании пользователя',
  'Ошибка чтения профиля пользователя',
  'Неверный email или пароль',
  'На сервере произошла ошибка'
];
