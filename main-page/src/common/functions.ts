
import { WordSignature, Word, UserWords, Statistics, GatheredStats } from '../api/types'

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
  const a = (await test(page, group)) as Word[][]
  const isUser = await isUserHere()
  if (isUser && fromPage) {
    const known = await getKnownWords(page, group)
    const familiar = await getUserWords()
    a.forEach(element => shuffle(element))
    const filtered = a
      .flat()
      .filter((elem) => !known.some((element) => element._id === elem.id))
    filtered.forEach((element) => {
      const elem = familiar.find((q) => q.wordId === element.id)
      if (elem) {

        element.properties = elem
      }
      else {
        element.isNew = true
      }
    })
    arr1 = filtered
  }
  else if (isUser) {
    const familiar = await getUserWords()
    const filtered = a.flat()
    filtered.forEach((element) => {
      const elem = familiar.find((q) => q.wordId === element.id);
      if (elem) {
        element.properties = elem
      }
      else {
        element.isNew = true
      }
    })
    arr1 = shuffle(filtered)
  }
  else if (fromPage) {
    a.forEach(element => shuffle(element))
    arr1 = a.flat()
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
      properties: elem.properties,
      isNew: elem.isNew,
      id: elem.id
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


export async function getUserWord(id: string) {
  const NonStringedUser = localStorage.getItem('userInfo') as string
  const user = JSON.parse(NonStringedUser)
  const token = user.token
  const url = `https://qwerzxvxzvzxvxzv.herokuapp.com/users/${user.userId}/words/${id}`
  const rawResp: Response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })
  if (rawResp.ok) {
    const resp = await (rawResp.json() as Promise<UserWords>)
    return resp
  }
}

export async function getUserWords() {
  const NonStringedUser = localStorage.getItem('userInfo') as string
  const user = JSON.parse(NonStringedUser)
  const token = user.token
  const url = `https://qwerzxvxzvzxvxzv.herokuapp.com/users/${user.userId}/words`
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
  const isUser = await isUserHere()
  if (isUser) {
    const NonStringedUser = localStorage.getItem('userInfo') as string
    const user = JSON.parse(NonStringedUser)
    const token = user.token
    const url = `https://qwerzxvxzvzxvxzv.herokuapp.com/users/${user.userId}/statistics`
    const rawResp = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
    if (!rawResp.ok) return false
    const resp = await rawResp.json()
    return resp
  }
}

export async function setUserWords(wordId: string, word: Partial<WordSignature>, method = 'POST') {
  const NonStringedUser = localStorage.getItem('userInfo') as string
  const user = JSON.parse(NonStringedUser)
  const token = user.token
  const url = `https://qwerzxvxzvzxvxzv.herokuapp.com/users/${user.userId}/words/${wordId}`
  const rawResp: Response = await fetch(url, {
    method: method,
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
  const NonStringedUser = localStorage.getItem('userInfo') as string
  const user = JSON.parse(NonStringedUser)
  console.log(user)
  const token = user.token
  const id = user.userId
  const filter = { 'userWord.optional.isKnown': true }
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
  console.log(resp)
  console.log(resp[0].paginatedResults)
  return resp[0].paginatedResults
}

export async function prepareAudioChallenge(
  page = 29,
  group = 0,
  fromPage = false
) {
  const arr = await test(page, group);
  const isUser = await isUserHere()
  let preResult;
  if (isUser && fromPage) {
    arr.forEach((element) => shuffle(element));
    const known = await getKnownWords(page, group);
    const familiar = await getUserWords();
    const filtered = arr
      .flat()
      .filter((elem) => !known.some((element) => element._id === elem.id));
    filtered.forEach((element) => {
      const elem = familiar.find((q) => q.wordId === element.id);
      if (elem) {
        element.properties = elem;
        element.isNew = false;
      }
      else {
        element.isNew = true
      }
    });
    preResult = filtered.slice(0, 20);
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
    console.log(familiar)
    preResult = shuffle(arr.flat()).slice(0, 20);
    preResult.forEach((element) => {
      const elem = familiar.find((q) => q.wordId === element.id);
      if (elem) {
        element.properties = elem;
        element.isNew = false;
      }
      else {
        element.isNew = true
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

async function createFalseWords(arr: Word[]) {
  let numbers = Array(10).fill(0)
  numbers = numbers.map(() => [getRandomInt(0, 29), getRandomInt(0, 5)])
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

export async function handleWord(element: WordSignature, correct: boolean, game: string) {

  let method = 'PUT'
  if (!element.properties) {
    method = 'POST'
    element.properties = {
      difficulty: 'easy',
      optional: {
        isKnown: false,
        streak: correct ? 1 : 0
      }
    }
  }
  else if (!correct) {
    element.properties = {
      difficulty: 'easy',
      optional: {
        isKnown: false,
        streak: 0
      }
    }
  }
  else {
    delete element.properties.wordId
    delete element.properties.id
    if (element.properties.difficulty === 'easy') {
      if (element.properties.optional?.streak !== undefined) {
        element.properties.optional.streak = element.properties.optional?.streak + 1
        element.properties.optional.isKnown = element.properties.optional?.streak > 2
      }
    }
    else
      if (element.properties.optional?.streak !== undefined) {
        element.properties.optional.streak = element.properties.optional.streak + 1
        if (element.properties.optional.streak > 4) {
          element.properties.difficulty = 'easy'
          element.properties.optional.isKnown = true
        }
      }
  }
  if (element.properties.optional) {
    if (game === 'audiochallenge') element.properties.optional.lastaudio = correct
    else element.properties.optional.lastsprint = correct
  }

  const isUser = await isUserHere()
  if (isUser) {
    try {
      setUserWords(element.id || '', element.properties, method)
    }
    catch (error) {
      console.log(error)
    }
  }
}
async function isUserHere() {
  try {
    const userinfo = localStorage.getItem('userInfo')
    if (!userinfo) return false
    const user = JSON.parse(userinfo)
    const baseurl = `https://qwerzxvxzvzxvxzv.herokuapp.com/users/${user.userId}`
    const resp = await fetch(baseurl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: 'application/json',
      },
    })
    if (!resp.ok) throw new Error('qwertr')
    else return true
  }
  catch (err) {
    console.log(err)
    return false
  }
}
export async function setUserStats(stats: Statistics) {
  const userinfo = localStorage.getItem('userInfo')
  if (userinfo === null) return
  else {
    const user = JSON.parse(userinfo as string)
    const baseurl = `https://qwerzxvxzvzxvxzv.herokuapp.com/users/${user.userId}/statistics`
    fetch(baseurl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stats),
      keepalive: true

    })
  }
}
export function handleStats(stats: Statistics, gathered: GatheredStats, game: string) {
  delete stats.id
  const timestamp = new Date(stats?.optional?.date)
  const now = new Date()

  if (game === 'sprint') {
    // long.unshift({
    //   new:stats.optional.sprint.newWords+stats.optional.audiochallenge.newWords,
    //   date:stats.optional.date,
    //   learned:stats.learnedWords
    // })
    // stats.optional.long=JSON.stringify(long)

    if (timestamp.getFullYear() === now.getFullYear() && timestamp.getMonth() === now.getMonth() && timestamp.getDate() === now.getDate()) {
      (stats.optional.sprint.percentage) = (stats.optional?.sprint?.percentage * stats.optional.sprint.answers + gathered.correctAnswers) / (stats.optional.sprint.answers + gathered.answers);
      (stats.optional.sprint.answers) += gathered.answers;
      (stats.optional.sprint.newWords) += gathered.new
      stats.optional.sprint.biggestStreak = stats.optional.sprint.biggestStreak > gathered.bigStreak ? stats.optional.sprint.biggestStreak : gathered.bigStreak
      stats.learnedWords += gathered.learned
    }
    else {
      stats.optional.sprint.percentage = gathered.correctAnswers / gathered.answers
      stats.optional.sprint.answers = gathered.answers
      stats.optional.sprint.biggestStreak = gathered.bigStreak
      stats.optional.sprint.newWords = gathered.new
      stats.learnedWords = gathered.learned
      stats.optional.date = new Date()
    }
  }
  //TODO
  else {
    // long.unshift({
    //   new:stats.optional.sprint.newWords+stats.optional.audiochallenge.newWords,
    //   date:stats.optional.date,
    //   learned:stats.learnedWords
    // })
    // stats.optional.long=JSON.stringify(long)
    if (timestamp.getFullYear() === now.getFullYear() && timestamp.getMonth() === now.getMonth() && timestamp.getDate() === now.getDate()) {
      (stats.optional.audiochallenge.percentage) = (stats.optional?.audiochallenge?.percentage * stats.optional.audiochallenge.answers + gathered.correctAnswers) / (stats.optional.audiochallenge.answers + gathered.answers);
      (stats.optional.audiochallenge.answers) += gathered.answers
      stats.optional.audiochallenge.newWords += gathered.new
      stats.optional.audiochallenge.biggestStreak = stats.optional.audiochallenge.biggestStreak > gathered.bigStreak ? stats.optional.audiochallenge.biggestStreak : gathered.bigStreak
      stats.learnedWords += gathered.learned
    }
    else {
      stats.optional.audiochallenge.percentage = gathered.correctAnswers / gathered.answers
      stats.optional.audiochallenge.answers = gathered.answers
      stats.optional.audiochallenge.biggestStreak = gathered.bigStreak
      stats.optional.audiochallenge.newWords = gathered.new
      stats.learnedWords = gathered.learned
      stats.optional.date = new Date()
    }
  }
  setUserStats(stats)
}

export function learned(before: boolean, after: boolean | undefined) {
  if (!before && after) return 1
  else return 0
}

export async function setUserWordsTextBook(wordId: string, word: UserWords, method = 'POST') {
  const NonStringedUser = localStorage.getItem('userInfo') as string
  const user = JSON.parse(NonStringedUser)
  const token = user.token
  const url = `https://qwerzxvxzvzxvxzv.herokuapp.com/users/${user.userId}/words/${wordId}`
  const rawResp: Response = await fetch(url, {
    method: method,
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
export async function test1(page = 0, group = 0) {
  const NonStringedUser = localStorage.getItem('userInfo') as string
  const user = JSON.parse(NonStringedUser)
  console.log(user)
  const token = user.token
  const id = user.userId
  const filter = { "$or": [{ "userWord.difficulty": 'hard', "userWord.optional.isKnown": "true" }] }
  const baseurl = `https://qwerzxvxzvzxvxzv.herokuapp.com/users/${id}/aggregatedWords?group=${group}
&wordsPerPage=${(page + 1) * 20}&filter=${JSON.stringify(filter)}`
  const rawResp = await fetch(baseurl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })
  const resp = await rawResp.json()
  console.log(resp)
  return resp[0].paginatedResults
}
export async function test3() {
  const user = localStorage.getItem('userInfo') as string
  const info = JSON.parse(user)
  const id = info.userId
  const raw = await fetch(`https://qwerzxvxzvzxvxzv.herokuapp.com/users/${id}/tokens`, {
    headers: {
      'Authorization': `Bearer ${info.refreshToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  const resp = await raw.json()
  info.token = resp.token
  info.refreshToken = resp.refreshToken
  const str = JSON.stringify(info)
  localStorage.setItem('userInfo', str)
}
