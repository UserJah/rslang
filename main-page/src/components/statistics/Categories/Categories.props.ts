import { IGame } from './../../../constants/Auth.interfaces';
export interface CategoryProps {
  title: string
  game: IGame
  words: number
  date: Date
}