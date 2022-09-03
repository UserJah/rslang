import { Morebuttons } from '../Controls/Buttons'
import React, { useState, useEffect } from 'react'
import { Statistics, WordSignature } from '../../api/types'
import { Postgame } from '../PostGameScreen/PostgameScreen'
import StarIcon from '@mui/icons-material/StarOutline'
import StarIconFilled from '@mui/icons-material/Star'
import { stick } from '../../common/assets/stick.js'
import {
  pteroIMG,
  pidgeionIMG,
  turkeyIMG,
  penguinIMG,
} from '../../common/assets/birdImages'
import { getstats, handleStats, handleWord,learned } from '../../common/functions'
import './gameScreen.css'



export function Card(props: {
  items: WordSignature[]
  end: boolean
  func: () => void
  reset:boolean
  fromPage:boolean
  endfunc:()=>void
}) {

  const [guessed, setGuessed] = useState<WordSignature[]>([])
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [statsData,setStatsData]=useState({new:0, answers:0,correctAnswers:0,learned:0,bigStreak:0})
const [load,isLoad]=useState(false)
const [userStats,setUserStats]=useState<Statistics|Record<string,never>>({})
useEffect(()=>{
  async function loadstats(){
    const resp=await getstats()
    if(resp){
      isLoad(true)
      setUserStats(resp)
      console.log(resp)
    }
  }
loadstats()
if (load) return ()=>handleStats(userStats as Statistics,statsData,'sprint')

},[props.reset])

  useEffect(() => {
    if(!props.reset){
if (load){
  handleStats(userStats as Statistics,statsData,'sprint')
}
    isLoad(false)
    setStatsData(()=>{return {new:0, answers:0,correctAnswers:0,learned:0,bigStreak:0}})
    setGuessed(() => [])
    setStreak(0)
    setScore(0)}
  }, [props.reset])

  useEffect(() => {
    function qwer(){
      handleStats(userStats as Statistics,statsData,'sprint')
    }
    window.addEventListener("beforeunload", qwer);
    return () => {
      window.removeEventListener("beforeunload",qwer);
    };
  }, []);

  function updateGameState(correct: boolean, elem: WordSignature): void {
    const a=elem.properties?.optional?.isKnown as boolean
    const b=elem.isNew
    let strk=streak

    if (elem.correct === correct) {
      strk+=1
      setStreak((streak)=>{return (streak + 1)})
      handleWord(elem,true,'sprint')
      elem.guessedCorrect = true
      setGuessed((oldArray) => [...oldArray, elem])

      setScore((score)=>{return (score + 10 * 2 ** Math.floor(streak / 4))})
    } else {
      strk=strk-4>0?strk-4:0
      setStreak(streak - 4 > 0 ? streak - 4 : 0)
      elem.guessedCorrect = false
      handleWord(elem,false,'sprint')
      setGuessed((oldArray) => [...oldArray, elem])

    }
    setStatsData((statsData)=>statsData={
      new:statsData.new + (b?1:0),
      answers : statsData.answers+1,
      correctAnswers:statsData.correctAnswers + (elem.guessedCorrect?1:0),
      learned:statsData.learned + learned(a,elem.properties?.optional?.isKnown),
      bigStreak:(statsData.bigStreak>strk)?statsData.bigStreak:strk
    })

  }

  const stars = function (strk: number, mult: number) {
    const arr = []
    for (let index = 0; index < 3; index++) {
      if (index < strk % mult)
        arr.push(<StarIconFilled sx={{ color: '#FC0', fontSize: '60px' }} />)
      else arr.push(<StarIconFilled sx={{ color: '#51876f', fontSize: '60px' }} />)
    }
    return arr
  }

  const birds = function (strk: number, mult: number) {
    const arr = [pteroIMG(), pidgeionIMG(), turkeyIMG(), penguinIMG()]
return [arr[0]].concat(
      arr.slice(
        1,
        1 + (Math.floor(strk / mult) > 5 ? 4 : Math.floor(strk / mult))
      )
    )

  }



  if (!props.end) {
    return (
      <div>
        <div className="gameBoard">
          <div className="info">
            <div className="starscontainer">{stars(streak, 4)}</div>
            <span className="Score">Score:{score}</span>
          </div>
          <div>{birds(streak, 4)}</div>
          <div className='stick' dangerouslySetInnerHTML={{ __html: stick }} />

          <Morebuttons
            elems={props.fromPage? props.items.filter(element=>!element.properties?.optional?.isKnown):props.items}
            updatefunc={updateGameState}
            known={guessed}
            endfunc={props.endfunc}
          />
        </div>
      </div>
    )
  } else {
    return <Postgame elements={guessed} func={props.func} />
  }
}
