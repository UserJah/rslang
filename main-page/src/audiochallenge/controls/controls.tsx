import React, { useEffect, useState } from "react";
import { WordSignature } from "../../api/types";
import { playaudio, getaudio } from "../../common/functions";
import './controls.css'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
export function Controls(props: { items: WordSignature[], updatefunc: (element: string) => void, counter: number, load: boolean, updatecount: () => void }) {

  const [answer, setAnswer] = useState("")
  const [screen, isScreen] = useState(false)
  function changecolor(element: string) {
    if (element !== answer) return 'aftergame'
    else if (answer === props.items[props.counter].wordTranslate) return 'win'
    else return 'lose'
  }
  useEffect(() => {
    document.body.click()
    playaudio(getaudio(props.items[props.counter].audio))

  }, [props.counter, props.items, props.load])
  useEffect(() => {
    function handlekeydown(evt: KeyboardEvent): void {
      if (!screen) {
        for (let i = 1; i < 6; i += 1) {
          if (evt.code === `Digit${i}`) {
            setAnswer((props.items[props.counter].variant as string[])[i - 1])
            isScreen(true)
            props.updatefunc(answer)
          }
        }
      }
      else {
        if (evt.code === 'Space') {
          isScreen(false)
          props.updatecount()
        }

      }

    }
    document.addEventListener('keydown', handlekeydown)
    return () => document.removeEventListener('keydown', handlekeydown)
  })
  if (!screen) return (<div>
    <div className="audio">
      <button onClick={() => playaudio(getaudio(props.items[props.counter].audio))}>
        <VolumeUpIcon sx={{ fontSize: 90 }} />
      </button>
    </div>
    <div className="variants">

      {(props.items[props.counter].variant as string[]).map((element, index) => {

        return <button key={props.items[props.counter].id + `${element}`}
          onClick={() => {
            setAnswer(element)
            isScreen(true)
            props.updatefunc(element)
          }
          }
        >
          {index + 1} {element}
        </button>

      })}
    </div>
  </div>
  )
  else return (
    <div>
      <div className="image">
        <img src={`https://qwerzxvxzvzxvxzv.herokuapp.com/${(props.items[props.counter].image as string)}`} alt="" />

      </div>
      <div className="postaudio">
        <button onClick={() => playaudio(getaudio(props.items[props.counter].audio))}>
          <VolumeUpIcon sx={{ fontSize: 30 }} />
        </button>
      </div>
      <div className="variants">
        {(props.items[props.counter].variant as string[]).map((element, index) => {

          return <button className={changecolor(element)} key={props.items[props.counter].id + `${element}`}
          >
            {index + 1} {element}
          </button>
        })}
      </div>
      <div className='nextcontainer'>
        <button className="next" onClick={() => {
          isScreen(false)
          props.updatecount()
        }}>
          <ArrowRightAltIcon />
        </button>
      </div>
    </div>
  )
}
