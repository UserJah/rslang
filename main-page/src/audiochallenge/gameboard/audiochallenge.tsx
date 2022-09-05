import React, { useState, useEffect } from "react";
import { prepareAudioChallenge,  handleWord, getstats, handleStats, learned,shuffle } from '../../common/functions'
import { WordSignature, Statistics } from "../../api/types";
import { Controls } from "../controls/controls";
import { Dots } from "../dots/dots";
import { PostGame } from "../endscreen/postgamescreen";
import './gameboard.css'
import { Preloader } from "./preloader";
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from "react-router-dom";

export function AudioChallenge(props?: { page?: number; group?: number, fromPage?: boolean }) {
  const [items, setItems] = useState<WordSignature[]>([]);
  const [load, isLoad] = useState(false);
  const [finish, isFinish] = useState(false);
  const [counter, setCounter] = useState(0);
  const [guessed, setGuessed] = useState<WordSignature[]>([])
  const [statsData, setStatsData] = useState({ new: 0, answers: 0, correctAnswers: 0, learned: 0, bigStreak: 0 })
  const [loadstats, isLoadstats] = useState(false)
  const [userStats, setUserStats] = useState<Statistics|Record<string,never>>({})
  const [streak, setStreak] = useState(0)
  const [noWords,setnoWords]=useState(false)
  useEffect(() => {
    const resp = async () => {
      const response = await prepareAudioChallenge(props?.page, props?.group, props?.fromPage);
      setItems(response);
      isLoad(true);
      if(response.length===0){
        setnoWords(true)
      }
    };

    resp();
  }, [props?.fromPage, props?.group, props?.page]);

  useEffect(() => {
    async function loadstats() {
      const resp = await getstats()
      if (resp) {
        isLoadstats(true)
        setUserStats(resp)
      }
    }
    loadstats()
  }, [finish])

  useEffect(() => {
    function qwer(){
      if(loadstats)
      handleStats(userStats as Statistics,statsData,'audiochallenge')
    }
    window.addEventListener("beforeunload", qwer);
    return () => {
      window.removeEventListener("beforeunload",qwer);
    };
  }, [loadstats, statsData, userStats]);

  function reset() {

    setStatsData(()=>{return {new:0, answers:0,correctAnswers:0,learned:0,bigStreak:0}})
    isFinish(false)
    setCounter(0)
    setGuessed([])
    setItems(filterItems())
  }

  function updateData(element: string) {

    const a = items[counter].properties?.optional?.isKnown as boolean
    const b = items[counter].isNew
    let strk = streak
    if (items[counter].wordTranslate === element) {
      strk+=1
      setStreak(streak+1)
      items[counter].guessedCorrect = true
      setGuessed(guessed => [...guessed, items[counter]])
      handleWord(items[counter], true, 'audiochallenge')

    }
    else {
      strk = 0
      setStreak(0)
      items[counter].guessedCorrect = false
      setGuessed(guessed => [...guessed, items[counter]])
      handleWord(items[counter], false, 'audiochallenge')

      }

    setStatsData((statsData) => statsData = {
      new: statsData.new + (b ? 1 : 0),
      answers: statsData.answers + 1,
      correctAnswers: statsData.correctAnswers + (items[counter].guessedCorrect ? 1 : 0),
      learned: statsData.learned + learned(a, items[counter].properties?.optional?.isKnown),
      bigStreak: (statsData.bigStreak > strk) ? statsData.bigStreak : strk
    })


  }
  function updateCounter(){

    if (counter !== items.length - 1) {setCounter(counter + 1);
    }

    else {
      isFinish(true)
      if(loadstats){
        handleStats(userStats as Statistics,statsData,'audiochallenge')
            }
  }
  }

  function filterItems(){
    items.forEach(element=>element.variant=shuffle(element.variant as string []))
    if (!props?.fromPage) return shuffle(items)
    else {
      const filtered=items.filter(element=>!element.properties?.optional?.isKnown)
     if(filtered.length>0) return shuffle(filtered)
     else {
       setnoWords(true)
       return items
     }
      }
    }

  if (!load && !finish) {
    return <Preloader/>
  }
  else if(noWords){
    return (
      <div className="gameboard">
      <Link to='/' className='exit_link'>
<ClearIcon onClick={()=>{
              if (load) handleStats(userStats as Statistics,statsData,'sprint')}}
              sx={{fontSize:40,color:'white'}}/>
  </Link>
    Вы отгадали все слова.
    Выйдите из игры для выбора другого уровня сложности или страницы учебника
  </div>
    )
  }

  else if (!finish) {
    return (
      <div className="gameboard">
                  <Link to='/' className='exit_link'>
          <ClearIcon onClick={()=>{
              if (loadstats) handleStats(userStats as Statistics,statsData,'audiochallenge')}}
              sx={{fontSize:40,color:'white'}}/>
          </Link>
        <div>
          <Dots arr={items} guessed={guessed} />
        </div>

        <div>
          <Controls items={items} updatefunc={updateData} counter={counter} load={load} updatecount={updateCounter}/>
        </div>
      </div>
    );
  }
  else return (
    <div className="gameboard">
                <Link to='/' className='exit_link'>
          <ClearIcon onClick={()=>{
              if (loadstats) handleStats(userStats as Statistics,statsData,'audiochallenge')}}
              sx={{fontSize:40,color:'white'}}/>
          </Link>
      <PostGame guessed={guessed} reset={reset} />
    </div>
  )
}
