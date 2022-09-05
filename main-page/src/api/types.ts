export type Word = {
  id: string
  group: number
  page: number
  word: string
  image: string
  audio: string
  audioMeaning: string
  audioExample: string
  textMeaning: string
  textExample: string
  transcription: string
  wordTranslate: string
  textMeaningTranslate: string
  textExampleTranslate: string
  streak?: number
  isKnown?: boolean
  difficulty?: string
  isNew?: boolean
  properties?: {
    difficulty: string
    optional?: {
      isKnown: boolean
      streak?: number
      lastaudio?: boolean
      lastsprint?: boolean
    }
  }
  _id: string
}
export enum Path {
  base = 'https://qwerzxvxzvzxvxzv.herokuapp.com/',
  word = 'words',
}
export type WordSignature = {
  word: string
  audio: string
  phrase: string
  correct: boolean
  translate: string
  guessedCorrect?: boolean
  correctTranslate: string
  isNew?: boolean
  isKnown?: boolean
  currentStreak?: number
  properties?: {
    wordId?: string
    difficulty: string
    optional?: {
      isKnown: boolean
      streak?: number
      lastaudio?: boolean
      lastsprint?: boolean
    }
    id?: string
  }
  difficulty?: string
  variant?: string[]
  wordTranslate?: string
  id?: string
  image?: string
}
export type Statistics = {
  id?: string
  learnedWords: number
  optional: {
    audiochallenge: {
      biggestStreak: number
      answers: number
      percentage: number
      newWords: number
    }
    sprint: {
      biggestStreak: number
      answers: number
      percentage: number
      newWords: number
    }
    date: Date
    long: string
  }
}
type Longstats = {
  date: Date
  new: number
  learned: number
}
export type UserWords = {
  difficulty: 'string'
  optional?: {
    isKnown: boolean
    streak?: number
    lastaudio?: boolean
    lastsprint?: boolean
  }
  id: string
  wordId: string
}
export type GatheredStats = {
  new: number
  answers: number
  correctAnswers: number
  learned: number
  bigStreak: number
}
