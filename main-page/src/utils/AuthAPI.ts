import AuthConstants from "../constants/Auth.constants"
import { ISignin } from "../constants/Auth.interfaces"
import AuthPathConstants from "../constants/AuthPath.constants"

class AuthAPI {
  private paths = {
    base: AuthPathConstants.BASE,
    signin: AuthPathConstants.SIGIN,
    users: AuthPathConstants.USERS,
  }

  public loginUser = async (user: ISignin): Promise<void> => {
    try {
      const response = await fetch(
        `${this.paths.base}${this.paths.signin}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        }
      )

      if (response.status === 200) {
        const { token, refreshToken, userId, name } = await response.json()

        localStorage.clear()

        localStorage.setItem(
          AuthConstants.USER_KEY_STORAGE,
          JSON.stringify({ userId, name, token, refreshToken, isAuth: true })
        )
      }

      if (
        response.status === 403 ||
        response.status === 404
      ) {
        localStorage.clear()

        localStorage.setItem(
          AuthConstants.USER_KEY_STORAGE,
          JSON.stringify({ isAuth: false })
        )

        throw new Error(AuthConstants.ERROR_SIGIN)
      }
    } catch (error) {
      console.log(error)
    }
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