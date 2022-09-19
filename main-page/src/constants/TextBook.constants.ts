export enum TextBookConstants {
  TEXT_BOOK_INFO = 'TextBookInfo',
  MAX_GROUPS = 7,
  MAX_PAGES = 30,
}

export const groups = [1, 2, 3, 4, 5, 6]

export const colors: string[] = [
  'lightgreen',
  'lightskyblue',
  'yellow',
  'orange',
  'orangered',
  'red',
]

export const playAudio = (arr: HTMLAudioElement[]) => {
  setTimeout(() => {
    arr[0].play()
    setTimeout(() => {
      arr[1].play()
      setTimeout(() => {
        arr[2].play()
      }, arr[1].duration * 1000)
    }, arr[0].duration * 1000)
  })
}
