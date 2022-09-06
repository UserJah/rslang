import React, { useState, useEffect } from 'react'
import { Card } from './gameScreen/GameScreen'
import { Timer } from './Timer/Timer'
import { WordSignature } from '../api/types'
import { prepare} from '../common/functions'
import { Preloader } from './preload/preloader'
import './exit_link.css'
export function Game(props: { group: number; page: number,fromPage:boolean }) {
  const [end, setEnd] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState<WordSignature[]>([])
  function updateEnd() {
    setEnd(true)
  }
  function playAgain() {
    setEnd(false)
  }

  useEffect(() => {
    const resp = async () => {
      const response = (await prepare(
        props.page,
        props.group,props.fromPage
      )) as WordSignature[]

      setIsLoaded(true)
      setItems(response)
    }

    resp()
  }, [props.fromPage, props.group, props.page])
  if (!isLoaded) {
    return <Preloader/>
  } else {
    return (

      <div className='gameboard'>

        <Timer seconds="60" endFunc={updateEnd} reset={end} />
        <Card items={items} end={end} func={playAgain} reset={end} fromPage={props.fromPage || false} endfunc={updateEnd}/>
      </div>
    )
  }
}
