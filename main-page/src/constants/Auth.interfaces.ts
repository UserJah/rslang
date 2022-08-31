export interface ISignin {
  email: string
  password: string
  login?: string
  name?: string
}

export interface IUserInfo {
  isAuth?: boolean
  token?: string
  refreshToken?: string
  userId?: string
  name?: string,
  experience?: Date

  message?: string
}

export interface IToken {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}
