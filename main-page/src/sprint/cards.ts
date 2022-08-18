import { api } from '../api/api';
import { Word, WordSignature } from '../api/types';
import {Card } from './card';
import {coinToss,getRandomInt,shuffle} from '../common/functions'
import './crap.css'
class cards {
  api:api
  counter:number
  guessedWords:WordSignature[]
  constructor(){
    this.guessedWords=[]
this.api=new api()
this.counter=0
const board=document.createElement('div')
board.classList.add('gameBoard')
document.body.appendChild(board)
  }
  async prepare(group=0,alreadyKnown:Word[]=[]){
    const a:Promise<Word[]>[]=[]
    const trick:WordSignature[]=[]
    for(let i=0;i<20;i+=1){
    const words=this.api.getWords(group,i)
    a.push(words)
  }
const arr1=shuffle((await Promise.all(a)).flat().filter(e=>!alreadyKnown.includes(e)))
arr1.map(async (elem)=>{
  const isTrue=coinToss(0.3)
 trick.push({
  correct:isTrue,
  word:elem.word,
  translate:isTrue?elem.wordTranslate:arr1[getRandomInt(0,arr1.length)].wordTranslate,
  audio:elem.audio,
  phrase:elem.audioExample
 })
})
return trick
  }
async doCards(arr:WordSignature[]){

  const card=new Card(arr[this.counter])
  card.appending()
document.querySelector('.left')?.addEventListener('click',async ()=>{
  if (!arr[this.counter].correct) this.guessedWords.push(arr[this.counter])
  this.counter+=1
  await this.doCards(arr)
})
document.querySelector('.right')?.addEventListener('click',async ()=>{
  if (arr[this.counter].correct) this.guessedWords.push(arr[this.counter])
  this.counter+=1
  await this.doCards(arr)
})
}
async doGame(){
  const arr=await this.prepare()
  this.doCards(arr)
}
}
const elem=document.createElement('div')
elem.innerHTML='15'
document.body.append(elem)
const timer=setInterval(()=>{
  elem.innerHTML=`${Number(elem.innerHTML)-1}`
  if (elem.innerHTML==='0'){
    console.log(q.guessedWords)
    clearInterval(timer)
  }
},1000)

const q=new cards()
q.doGame()
