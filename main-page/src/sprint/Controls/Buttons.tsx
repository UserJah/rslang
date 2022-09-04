import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { getaudio, playaudio } from '../../common/functions'
import { WordSignature } from '../../api/types'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import './Buttons.css'

export function Morebuttons(props: {
  elems: WordSignature[]
  updatefunc: (correct: boolean, elem: WordSignature) => void
  known: WordSignature[]
  endfunc:()=>void
}) {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    function keyboardhadler(evt: KeyboardEvent): void {
      if (evt.code === 'ArrowLeft') {
        props.updatefunc(false, props.elems[counter])
        if(counter===props.elems.length-1) props.endfunc()
        setCounter(counter + 1)
      }
      if (evt.code === 'ArrowRight') {
        props.updatefunc(true, props.elems[counter])
        if(counter===props.elems.length-1) props.endfunc()
        setCounter(counter + 1)
      }
      if(evt.code==='Space'){
        playaudio(getaudio(props.elems[counter].audio))
      }
    }
    document.addEventListener('keydown', keyboardhadler)
    return () => document.removeEventListener('keydown', keyboardhadler)
  }, [counter, props])

  return (
    <div className="Buttoncontainer">


      <div className="wordText">
        <p className="wordtext english_word"> {props.elems[counter].word}</p>{' '}
        <button
        className="word"
        color="secondary"
        onClick={() => playaudio(getaudio(props.elems[counter].audio))}
      >
        <VolumeUpIcon color="secondary" sx={{fontSize:40,color:'#f3711a'}} />
      </button>
        <p className="wordtext">{props.elems[counter].translate}</p>{' '}
      </div>

      <div className="control_container">
        <Button
        sx={{height:50,width:200,fontSize:22}}
          className="left"
          tabIndex={0}
          variant="contained"
          color="error"
          key='Wrong'
          onClick={() => {
            props.updatefunc(false, props.elems[counter])
            if(counter===props.elems.length-1) props.endfunc()
            else setCounter(counter + 1)
          }}
        >
          Wrong
        </Button>

        <Button sx={{height:50,width:200,fontSize:22}}
          className="right"
          variant="contained"
          color="success"
          key='Right'
          onClick={() => {
            props.updatefunc(true, props.elems[counter])
            if(counter===props.elems.length-1) props.endfunc()
            else setCounter(counter + 1)
          }}
        >
          {' '}
        Right
        </Button>
      </div>
    </div>
  )
}
