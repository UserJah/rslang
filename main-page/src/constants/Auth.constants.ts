const enum AuthConstants {
  SUCCESS = 'Пользователь успешно зарегистрирован',
  GREETING = 'Добро пожаловать',
  PARTING = 'Ждём вас снова =)',

  ERROR_SIGIN = '* Некорректный пароль или email',
  ERROR_EMAIL = '* Некорректный email',
  ERROR_LOGIN = '* Введите login',
  ERROR_AUTH = '* Пользователь не зарегистрирован',
  ERROR_CREATE = '* Такой пользователь уже зарегистрирован',
  ERROR_PASS = '* Пароль меньше 8 символов',
  ERROR_TOKEN_MISS = '* Пожалуйста авторизуйтесь',
  USER_KEY_STORAGE = 'userInfo',
  POP_UP_DELAY = 2000,
  REFRESH_TOKEN_LIFE = 12600000, //3.5h
}

export default AuthConstants
