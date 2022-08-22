import { Morebuttons } from './Controls/Buttons'
import React, { useState, useEffect } from 'react'
import { WordSignature } from '../api/types'
import { Postgame } from './PostGameScreen/PostgameScreen'
import StarIcon from '@mui/icons-material/StarOutline'
import StarIconFilled from '@mui/icons-material/Star'
import { stick } from '../common/assets/stick.js'
import {
  pteroIMG,
  pidgeionIMG,
  turkeyIMG,
  penguinIMG,
} from '../common/assets/birdImages'

import './gameScreen.css'

export function Card(props: {
  items: WordSignature[]
  end: boolean
  func: () => void
  reset: number
}) {
  const [guessed, setGuessed] = useState<WordSignature[]>([])
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)

  function updateGameState(correct: boolean, elem: WordSignature): void {
    if (elem.correct === correct) {
      elem.guessedCorrect = true
      setGuessed((oldArray) => [...oldArray, elem])
      setStreak(streak + 1)
      setScore(score + 10 * 2 ** Math.floor(streak / 4))
    } else {
      elem.guessedCorrect = false
      setGuessed((oldArray) => [...oldArray, elem])
      setStreak(streak - 1 > 0 ? streak - 1 : 0)
    }
  }
  const stars = function (strk: number, mult: number) {
    const arr = []
    for (let index = 0; index < 3; index++) {
      if (index < strk % mult)
        arr.push(<StarIconFilled sx={{ color: '#FC0', fontSize: '60px' }} />)
      else arr.push(<StarIcon sx={{ color: '#000', fontSize: '60px' }} />)
    }
    return arr
  }
  const birds = function (strk: number, mult: number) {
    console.log(guessed)
    const arr = [pteroIMG(), pidgeionIMG(), turkeyIMG(), penguinIMG()]
    return [arr[0]].concat(
      arr.slice(
        1,
        1 + (Math.floor(strk / mult) > 5 ? 4 : Math.floor(strk / mult))
      )
    )
  }

  useEffect(() => {
    setGuessed(() => [])
    setStreak(0)
    setScore(0)
  }, [props.reset])

  if (!props.end) {
    return (
      <div>
        <div className="gameBoard">
          <div className="info">
            <div className="starscontainer">{stars(streak, 4)}</div>
            <span className="Score">Score:{score}</span>
          </div>
          <div>{birds(streak, 4)}</div>
          <div dangerouslySetInnerHTML={{ __html: stick }} />

          <Morebuttons
            elems={props.items}
            updatefunc={updateGameState}
            known={guessed}
          />
        </div>
      </div>
    )
  } else {
    return <Postgame elements={guessed} func={props.func} />
  }
}
