import React from 'react'
import { WordSignature } from '../../api/types'
import { playaudio, getaudio } from '../../common/functions'
import './PostGameScreen.css'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
export function Postgame(props: {
  elements: WordSignature[]
  func: () => void
}) {
  function check(elem:WordSignature){
    if (elem.guessedCorrect) return <CheckIcon sx={{color:'green'}}/>
    else return <ClearIcon sx={{color:'red'}}/>
  }
  return (
    <div className="postGameScreen">
      <h2>Results</h2>
      <ul>
        {props.elements.map((item) => (
          <li className="postGameElement" key={item.audio}>
            <button
              className="postgame_audio"
              onClick={() => playaudio(getaudio(item.audio))}
            >
              <VolumeUpIcon sx={{fontSize:20 ,color:'grey' }}/>
            </button>
            <p className="postGameWord">{item.word}</p>
            <p className="postGameWord">{item.correctTranslate}</p>
            <p>{check(item)}</p>

          </li>
        ))}
      </ul>
      <button className='again' onClick={() => props.func()}> Play Again</button>
    </div>
  )
}
