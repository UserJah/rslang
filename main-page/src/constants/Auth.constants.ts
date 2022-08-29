const enum AuthConstants {
  ERROR_SIGIN = '* Некорректный пароль или email',
  ERROR_EMAIL = '* Некорректный email',
  ERROR_AUTH = '* Пользователь не зарегистрирован',
  ERROR_CREATE = '* Такой пользователь уже зарегистрирован',
  ERROR_PASS = '* Пароль меньше 8 символов',
  USER_KEY_STORAGE = 'userInfo',
  GREETING_DELAY = 2000,
  REFRESH_TOKEN_DELAY = 12600000, //3.5h
}

export default AuthConstants;
