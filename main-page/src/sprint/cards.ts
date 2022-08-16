import { api } from '../api/api';
import {Card } from './card';
class cards {
  api:api
  constructor(){
this.api=new api()
  }
async doCards(){
  const words=await this.api.getWords(1,2)
  words.forEach(element=>{
    const card=new Card(element)
    card.appending()
  })
}
}
const q=new cards
q.doCards()
