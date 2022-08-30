import { ISignin, IToken } from './../constants/Auth.interfaces';
import AuthPathConstants from '../constants/AuthPath.constants'

class AuthAPI {
  private paths = {
    base: AuthPathConstants.BASE,
    signin: AuthPathConstants.SIGIN,
    users: AuthPathConstants.USERS,
    tokens: AuthPathConstants.TOKENS
  }

  public loginUser = async (user: ISignin): Promise<Response | undefined> => {
    try {
      const response = await fetch(`${this.paths.base}${this.paths.signin}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })

      return response

    } catch (error) {
      console.log('loginUser api', error)
    }
  }

  public getNewToken = async (id: string, refToken: string): Promise<IToken | undefined> => {

    try {
      const newToken = await fetch(`${this.paths.base}${this.paths.users}/${id}${AuthPathConstants.TOKENS}`, {
        method: "GET",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${refToken}`
        },
      })

      return await newToken.json()
    } catch (error) {
      console.log('getNewToken api', error)
    }
  }

  public createUser = async (user: ISignin): Promise<Response | undefined> => {
    try {
      const response = await fetch(`${this.paths.base}${this.paths.users}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })

      return response;

    } catch (error) {
      console.log('createUser api', error)
    }
  }

}

export default new AuthAPI()
