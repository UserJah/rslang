import { ISignin, IStat } from './../constants/Auth.interfaces';
import AuthPathConstants from '../constants/AuthPath.constants'

class AuthAPI {
  private paths = {
    base: AuthPathConstants.BASE,
    signin: AuthPathConstants.SIGIN,
    users: AuthPathConstants.USERS,
    tokens: AuthPathConstants.TOKENS,
    statistics: AuthPathConstants.STATISTICS
  }


  public getStat = async (id: string, token: string): Promise<Response | undefined> => {
    try {
      const response = await fetch(`${this.paths.base}${this.paths.users}/${id}${this.paths.statistics}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },

      })

      return response

    } catch (error) {
      console.log('getStat api', error)
    }
  }

  public updateStat = async (id: string, token: string, optional: IStat): Promise<Response | undefined> => {
    try {
      const response = await fetch(`${this.paths.base}${this.paths.users}/${id}${this.paths.statistics}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(optional),

      })

      return response

    } catch (error) {
      console.log('getStat api', error)
    }
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

  public getNewToken = async (id: string, refToken: string): Promise<Response | undefined> => {

    try {
      const newToken = await fetch(`${this.paths.base}${this.paths.users}/${id}${this.paths.tokens}`, {
        method: "GET",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${refToken}`,
        },
      })

      return newToken.json()
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
