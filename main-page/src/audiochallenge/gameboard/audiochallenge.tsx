import React, { useState, useEffect } from "react";
import { prepareAudioChallenge, shuffle, handleWord, getstats, handleStats, learned } from '../../common/functions'
import { WordSignature, Statistics } from "../../api/types";
import { Controls } from "../controls/controls";
import { Dots } from "../dots/dots";
import { PostGame } from "../endscreen/postgamescreen";
import './gameboard.css'
import { Preloader } from "./preloader";


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
  useEffect(() => {
    const resp = async () => {
      const response = await prepareAudioChallenge(props?.page, props?.group, props?.fromPage);
      setItems(response);
      isLoad(true);
    };

    resp();
  }, [props?.fromPage, props?.group, props?.page]);

  useEffect(() => {
    async function loadstats() {
      const resp = await getstats()
      if (resp) {
        isLoadstats(true)
        setUserStats(resp)
        console.log(resp)
      }
    }
    loadstats()
  }, [finish])

  function reset() {

    setStatsData(()=>{return {new:0, answers:0,correctAnswers:0,learned:0,bigStreak:0}})
    isFinish(false)
    setCounter(0)
    setGuessed([])
    setItems(shuffle(items))
  }

  function updateData(element: string) {

    const a = items[counter].properties?.optional?.isKnown as boolean
    const b = items[counter].isNew
    let strk = streak
    if (items[counter].wordTranslate === element) {
      console.log('im correct')
      strk+=1
      setStreak(streak+1)
      items[counter].guessedCorrect = true
      setGuessed(guessed => [...guessed, items[counter]])
      handleWord(items[counter], true, 'audiochallenge')

    }
    else {
      console.log('im not correct')
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
    console.log(statsData)
    if (counter !== items.length - 1) setCounter(counter + 1);
    else {
      isFinish(true)
      if(loadstats){
        handleStats(userStats as Statistics,statsData,'audiochallenge')
            }
  }
  }
  if (!load && !finish) {
    return <Preloader/>
  } else if (!finish) {
    return (
      <div className="gameboard">
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
      <PostGame guessed={guessed} reset={reset} />
    </div>
  )
}
