export type Word = {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  streak?:number
  isKnown?:boolean
  difficulty?:string
  isNew?:boolean
};
export enum Path {
  base='https://qwerzxvxzvzxvxzv.herokuapp.com/',
  word='words'
}
export type WordSignature={
  word:string,
  audio:string,
  phrase:string,
  correct:boolean,
 translate:string
 guessedCorrect?:boolean
 correctTranslate:string
 isNew?:boolean
 isKnown?:boolean;
 currentStreak?:number
 difficulty?:string
}
export type Statistics={
  learnedwords:number,
  optional?:{
    biggestStreak?:number
    answers?:number,
    percentage?:number
  }
}
export type UserWords={
  difficulty:'string',
  optional:{
    known:boolean,
    streak:number
  },
  id:string,
  wordId:string
}
