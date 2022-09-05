import { Statistics } from "../api/types"
const obj=[{
  date:new Date(),
  learned:0,
  new:0
}]
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
,date:new Date(),
long: JSON.stringify(obj)

  }

}
