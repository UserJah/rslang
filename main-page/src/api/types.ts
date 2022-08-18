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
}
