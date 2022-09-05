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


export interface IStatistics {
  id?: string
  learnedWords: number
  optional?: {
    audiochallenge?: IGame,
    sprint?: IGame,
    date: Date,
    long: ILongStat | string
  }
}

export interface IGame {
  biggestStreak?: number
  answers?: number
  percentage?: number
  newWords: number
}

export interface ILongStat {
  date: Date,
  new: number
  learned: number
}
