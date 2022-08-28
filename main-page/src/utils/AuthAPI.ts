import { ISignin } from './../constants/Auth.interfaces';
import AuthConstants from '../constants/Auth.constants'
import AuthPathConstants from '../constants/AuthPath.constants'

class AuthAPI {
  private paths = {
    base: AuthPathConstants.BASE,
    signin: AuthPathConstants.SIGIN,
    users: AuthPathConstants.USERS,
    tokens: AuthPathConstants.TOKENS
  }

  public loginUser = async (user: ISignin): Promise<void> => {
    try {
      const response = await fetch(`${this.paths.base}${this.paths.signin}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })

      if (response.status === 200) {
        const { token, refreshToken, userId, name } = await response.json()

        const experience = new Date()

        localStorage.setItem(
          AuthConstants.USER_KEY_STORAGE,
          JSON.stringify({ userId, name, token, refreshToken, isAuth: true, experience })
        )


        const authTimerId = setTimeout(() => {

          this.setNewToken(userId, refreshToken)

        }, AuthConstants.REFRESH_TOKEN_DELAY)

        window.addEventListener('beforeunload', () => {
          clearTimeout(authTimerId)
        })
      }

      if (response.status === 403) {
        const { userId, refreshToken, } = await response.json()

        this.setNewToken(userId, refreshToken)
      }

    } catch (error) {
      console.log(error)
    }
  }

  public setNewToken = async (id: string, refToken: string):Promise<void> => {
  const experience: Date = new Date()

  const newToken = await fetch(`${this.paths.base}${this.paths.users}/${id}${AuthPathConstants.TOKENS}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${refToken}`
    },
  })

  const { token, refreshToken, userId, name } = await newToken.json()


  localStorage.setItem(
    AuthConstants.USER_KEY_STORAGE,
    JSON.stringify({ userId, name, token, refreshToken, isAuth: true, experience })
  )
}

  public createUser = async (user: ISignin): Promise<void> => {
  await fetch(`${this.paths.base}${this.paths.users}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
}

}

export default new AuthAPI()
