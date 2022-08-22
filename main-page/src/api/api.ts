import { Word, Path } from './types'

export class api {
  constructor() {}
  async getWords(group = 0, page = 0): Promise<Word[]> {
    const resp = await fetch(
      Path.base + Path.word + '?' + `group=${group}&page=${page}`
    )
    const body = await resp.json()
    return body
  }
  async getImgUrl(path: string) {
    const url = Path.base + path
    const resp = await fetch(url)
    const body = await resp.blob()
    const objURL = URL.createObjectURL(body)
    return objURL
  }
  async getAudio(path: string) {
    const url = Path.base + path
    const resp = await fetch(url)
    const body = resp.arrayBuffer()
    return body
  }
}
const q = new api()
console.log(q.getWords(1, 2))
