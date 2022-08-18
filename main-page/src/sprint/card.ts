import { Word, WordSignature } from "../api/types";
import { api } from "../api/api";
import {button} from './button'
export class Card{
  card:HTMLDivElement;
  api:api
  word:WordSignature
 constructor(word:WordSignature){
  this.word=word
    this.api=new api()
const container=document.createElement('div')
container.classList.add('card')
const phrase=new button(['phrase']).button
phrase.innerText='ФРАЗА'
const wordButton=new button(['word']).button
wordButton.innerText='СЛОВО'
const leftButton=new button(['left']).button
leftButton.innerText='НЕВЕРНО'
const rightButton=new button(['right']).button
rightButton.innerText='ВЕРНО'
const textWord=document.createElement('p')
textWord.classList.add('textWord')
const textTransalte=document.createElement('p')
textTransalte.classList.add('textTranslate')
container.append(phrase,wordButton,leftButton,rightButton,textWord,textTransalte)
this.card=container
  }
async appendAudio(path:string,element:HTMLElement){
const context=new AudioContext()
const source=context.createBufferSource()
const buffer=await this.api.getAudio(path)

source.buffer=await context.decodeAudioData(buffer)
source.connect(context.destination)
element.onclick=()=>source.start(0)
}
async playaudio(futureAudio: Promise<ArrayBuffer>) {
 const audio=await futureAudio
  const context = new AudioContext();
  const buffer1 = await context.decodeAudioData(audio);
  const source = context.createBufferSource();
  source.buffer = buffer1;
  source.connect(context.destination);
  source.start(0)
}
async appending(){
  (this.card.querySelector('.textWord') as HTMLParagraphElement).innerText=this.word.word;
  (this.card.querySelector('.textTranslate') as HTMLParagraphElement).innerText=this.word.translate;
(this.card.querySelector('.word')as HTMLElement).addEventListener('click',async ()=>
await this.playaudio(this.api.getAudio(this.word.audio)));
(this.card.querySelector('.phrase')as HTMLElement).addEventListener('click',async ()=>
await this.playaudio(this.api.getAudio(this.word.phrase)));
(document.querySelector('.gameBoard')as HTMLElement).innerHTML='';
(document.querySelector('.gameBoard')as HTMLElement).appendChild(this.card)
}
}
