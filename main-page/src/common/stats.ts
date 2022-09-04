import { Statistics } from "../api/types"
export const defaultstats:Statistics={
  learnedWords:0,
  optional:{
audiochallenge:{
  biggestStreak:0,
  answers:0,
  percentage:0,
  newWords:0
},
sprint:{
  biggestStreak:0,
  answers:0,
  percentage:0,
  newWords:0
}
,date:new Date()
  }

}
