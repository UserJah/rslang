import React from 'react'
import { WordSignature } from '../../api/types'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import { playaudio, getaudio } from '../../common/functions'
import './postgame.css'

export function PostGame(props: {
  guessed: WordSignature[]
  reset: () => void
}) {
  const a = props.guessed.map((element) => {
    let icon
    if (element.guessedCorrect) icon = <CheckIcon sx={{ color: 'green' }} />
    else icon = <ClearIcon sx={{ color: 'red' }} />
    return (
      <div key={element.id}>
        <button onClick={() => playaudio(getaudio(element.audio))}>
          <VolumeUpIcon sx={{ fontSize: 20 }} />
        </button>
        <div>{element.word}</div>
        <div>{element.wordTranslate}</div>
        {icon}
      </div>
    )
  })
  return (
    <div className="postgame">
      {a}
      <button onClick={props.reset}>RESET</button>
    </div>
  )
}
