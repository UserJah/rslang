enum AuthConstants {
  ERROR_SIGIN = '* Некорректный пароль или email',

  USER_KEY_STORAGE = 'userInfo',
  SIGN_DELAY = 2000,
  REFRESH_TOKEN_DELAY=12600000, //3.5h
}

export const ERROR_AUTH = '* Пользователь не зарегистрирован'
export const ERROR_PASS = '* Пароль меньше 8 символов'

export default AuthConstants
