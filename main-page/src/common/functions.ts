import { WordSignature, Word, UserWords } from '../api/types'

export function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export function coinToss(probability: number): boolean {
  return Math.random() < probability
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}
export async function test(page: number, group: number) {
  const q = []
  for (let i = page; i > -1; i += -1) {
    const url = `https://qwerzxvxzvzxvxzv.herokuapp.com/words?page=${i}&group=${group}`
    q.push(fetch(url))
  }
  const resp = await Promise.all(
    q.map(async (elem) => {
      const resp1 = await elem
      const body = await resp1.json()
      return body
    })
  )
  return resp
}
export async function prepare(
  page = 29,
  group = 0,
  fromPage?: boolean
): Promise<WordSignature[]> {
  let arr1: Word[] = []
  const trick: WordSignature[] = []
  const a = (await test(page, group)).flat() as Word[]
  const isUser = localStorage.getItem('userinfo') !== null

  if (isUser && fromPage) {
    const known = await getKnownWords(page, group)
    const familiar = await getUserWords()
    const filtered = a
      .flat()
      .filter((elem) => !known.some((element) => element.id === elem.id))
    filtered.forEach((element) => {
      const elem = familiar.find((q) => q.wordId === element.id)
      if (elem) {
        element.streak = elem.optional.streak
        element.difficulty = elem.difficulty
        element.isKnown = elem.optional.known
        element.isNew = false
      }
    })
    arr1 = shuffle(filtered)
  } else if (isUser) {
    const familiar = await getUserWords()
    const filtered = a.flat()
    filtered.forEach((element) => {
      const elem = familiar.find((q) => q.wordId === element.id)
      if (elem) {
        element.streak = elem.optional.streak
        element.difficulty = elem.difficulty
        element.isKnown = elem.optional.known
        element.isNew = false
      }
    })
    arr1 = shuffle(filtered)
  } else {
    arr1 = shuffle(a.flat())
  }
  arr1.map(async (elem) => {
    const isTrue = coinToss(0.5)
    trick.push({
      correct: isTrue,
      word: elem.word,
      translate: createTranslation(arr1, elem, isTrue),
      audio: elem.audio,
      phrase: elem.audioExample,
      correctTranslate: elem.wordTranslate,
      isKnown: elem.isKnown,
      isNew: elem.isNew,
      difficulty: elem.difficulty,
      currentStreak: elem.streak,
    })
  })
  return trick
}

export async function fetchWords(page = 0, group = 0): Promise<Word[]> {
  const res = await fetch(
    `https://qwerzxvxzvzxvxzv.herokuapp.com/words?page=${page}&group=${group}`
  )
  const resp = await res.json()
  return resp
}

function createTranslation(
  arr: Word[],
  element: Word,
  isTrue: boolean
): string {
  if (isTrue) return element.wordTranslate
  else {
    let translate = ''
    let found = false
    while (!found) {
      translate = arr[getRandomInt(0, arr.length)].wordTranslate
      if (element.wordTranslate !== translate) found = true
    }
    return translate
  }
}

export async function playaudio(futureAudio: Promise<ArrayBuffer>) {
  const audio = await futureAudio
  const context = new AudioContext()
  const buffer1 = await context.decodeAudioData(audio)
  const source = context.createBufferSource()
  source.buffer = buffer1
  source.connect(context.destination)
  source.start(0)
}

export async function getaudio(path: string) {
  const url = 'https://qwerzxvxzvzxvxzv.herokuapp.com/' + path
  const resp = await fetch(url)
  const body = resp.arrayBuffer()
  return body
}

export function Score(
  correct: boolean,
  elem: WordSignature,
  data: { streak: number; score: number; arr: WordSignature[] }
): void {
  if (elem.correct === correct) {
    data.arr.push(elem)
    data.score += 2 ** Math.floor(data.streak / 4) * 20
    data.streak += 1
  } else {
    data.streak -= 1
  }
}
export async function getUserWords() {
  const NonStringedUser = localStorage.getItem('userinfo') as string
  const user = JSON.parse(NonStringedUser)
  const token = user.token
  const url = `https://qwerzxvxzvzxvxzv.herokuapp.com/users/${user.id}/words`
  const rawResp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })
  const resp = await (rawResp.json() as Promise<UserWords[]>)
  return resp
}

export async function getstats() {
  const NonStringedUser = localStorage.getItem('userinfo') as string
  const user = JSON.parse(NonStringedUser)
  const token = user.token
  const url = `https://qwerzxvxzvzxvxzv.herokuapp.com/users/${user.id}/statistics`
  const rawResp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })
  const resp = await (rawResp.json() as Promise<Word[]>)
  return resp
}

export async function setUserWords({ wordId, word }) {
  const NonStringedUser = localStorage.getItem('userinfo') as string
  const user = JSON.parse(NonStringedUser)
  const token = user.token
  const url = `https://qwerzxvxzvzxvxzv.herokuapp.com/users/${user.id}/words/${wordId}`
  const rawResp = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  })
  const resp = await (rawResp.json() as Promise<Word>)
  return resp
}

export async function getKnownWords(page = 29, group = 0): Promise<Word[]> {
  const NonStringedUser = localStorage.getItem('userinfo') as string
  const user = JSON.parse(NonStringedUser)
  const token = user.token
  const id = user.id
  const filter = { 'userWord.optional.known': true }
  const baseurl = `https://qwerzxvxzvzxvxzv.herokuapp.com/users/${id}/aggregatedWords?group=${group}&wordsPerPage=
${(page + 1) * 20}&filter=${JSON.stringify(filter)}`
  const rawResp = await fetch(baseurl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })
  const resp = await rawResp.json()
  return resp.paginatedResults
}

export async function prepareAudioChallenge(
  page = 29,
  group = 0,
  fromPage = false
) {
  const arr = await test(page, group);
  const isUser = localStorage.getItem("userinfo") !== null;
  let preResult;
  if (isUser && fromPage) {
    arr.forEach((element) => shuffle(element));
    const known = await getKnownWords(page, group);
    const familiar = await getUserWords();
    const filtered = arr
      .flat()
      .filter((elem) => !known.some((element) => element.id === elem.id));
    filtered.forEach((element) => {
      const elem = familiar.find((q) => q.wordId === element.id);
      if (elem) {
        element.properties = elem;
        element.isNew = false;
      }
    });
    preResult = arr.flat().slice(0, 20);
    const falseWords = shuffle(await createFalseWords(preResult));
    preResult.forEach((element, index) => {
      element.variant = [element.wordTranslate];
      for (let i = 0; i < 4; i += 1) {
        element.variant.push(falseWords[index * 4 + i].wordTranslate);
      }
      element.variant = shuffle(element.variant);
    });
  } else if (isUser) {
    const familiar = await getUserWords();
    preResult = shuffle(arr.flat()).slice(0, 20);
    preResult.forEach((element) => {
      const elem = familiar.find((q) => q.wordId === element.id);
      if (elem) {
        element.properties = elem;
        element.isNew = false;
      }
    });
    const falseWords = shuffle(await createFalseWords(preResult));
    preResult.forEach((element, index) => {
      element.variant = [element.wordTranslate];
      for (let i = 0; i < 4; i += 1) {
        element.variant.push(falseWords[index * 4 + i].wordTranslate);
      }
      element.variant = shuffle(element.variant);
    });
  } else if (fromPage) {
    arr.forEach((element) => shuffle(element));
    preResult = arr.flat().slice(0, 20);
    const falseWords = shuffle(await createFalseWords(preResult));
    preResult.forEach((element, index) => {
      element.variant = [element.wordTranslate];
      for (let i = 0; i < 4; i += 1) {
        element.variant.push(falseWords[index * 4 + i].wordTranslate);
      }
      element.variant = shuffle(element.variant);
    });
  } else {
    preResult = shuffle(arr.flat()).slice(0, 20);
    const falseWords = shuffle(await createFalseWords(preResult));

    preResult.forEach((element, index) => {
      element.variant = [element.wordTranslate];
      for (let i = 0; i < 4; i += 1) {
        element.variant.push(falseWords[index * 4 + i].wordTranslate);
      }
      element.variant = shuffle(element.variant);
    });
    console.log(preResult);
  }
  console.log(preResult);
  return preResult;
}

async function createFalseWords(arr:Word[]){
  console.log(1)
  let numbers=Array(10).fill(0)
  numbers=numbers.map( ()=>[getRandomInt(0,29),getRandomInt(0,5)])
  const q = []
  for (let i = 0; i < numbers.length; i += 1) {
    const url = `https://qwerzxvxzvzxvxzv.herokuapp.com/words?page=${numbers[i][0]}&group=${numbers[i][1]}`
    q.push(fetch(url))
  }
  const resp = await Promise.all(
    q.map(async (elem) => {
      const resp1 = await elem
      const body = await resp1.json()
      return body
    })
  )
  return resp.flat().filter((elem) => !arr.some((element) => element.id === elem.id))
}
