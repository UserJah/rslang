export interface ISignin {
  email: string;
  password: string;
}

export interface IUserInfo {
  isAuth: boolean;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}