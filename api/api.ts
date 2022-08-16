import { Word,Path } from "./types"

const url='http://localhost:8080/words/5e9f5ee35eb9e72bc21af4a8'
const url1='http://localhost:8080'
async function qwer(){
  const resp=await fetch(url)
  const body=await resp.json()
  console.log(body)
}
qwer()
class api{
  constructor(){

  }
  async getWords(group=0,page=0):Promise<Word[]>{
const resp=await fetch(Path.base+Path.word)
const body=await resp.json()
return body
  }
}
const q=new api()
console.log(await q.getWords())
