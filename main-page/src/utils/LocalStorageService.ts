import { IUserInfo } from '../constants/Auth.interfaces'

class LocalStorageService {
  public setItem(key: string, value: IUserInfo): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  public getItem<T>(key: string): T | null {
    const data: string | null = localStorage.getItem(key)

    if (data !== null) {
      return JSON.parse(data)
    }

    return null
  }

  public clear(): void {
    localStorage.clear()
  }
}

export default new LocalStorageService()
