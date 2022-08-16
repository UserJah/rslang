import { Word } from "../api/types";
import { api } from "../api/api";
import {button} from './button'
export class Card{
  card:HTMLDivElement;
  api:api
  word:Word
 constructor(word:Word){
  this.word=word
    this.api=new api()
const container=document.createElement('div')
container.classList.add('card')
container.appendChild(new button(['word']).button)
container.appendChild(new button(['phrase']).button)
container.appendChild(new button(['left']).button)
container.appendChild(new button(['right']).button)
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

async appending(){
  await this.appendAudio(this.word.audio,this.card.querySelector('.word')as HTMLElement)
await this.appendAudio(this.word.audioExample,this.card.querySelector('.phrase') as HTMLElement)
document.body.appendChild(this.card)
}
}
