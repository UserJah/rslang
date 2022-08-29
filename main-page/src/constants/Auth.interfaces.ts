export interface ISignin {
  email: string
  password: string
}

export interface IUserInfo {
  isAuth: boolean
  token?: string
  refreshToken?: string
  userId?: string
  name?: string,
  experience?: string
}

export interface IDataAuth extends ISignin {
  login: string
}


export interface IToken {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}
