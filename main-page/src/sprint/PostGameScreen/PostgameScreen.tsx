import React from 'react'
import { WordSignature } from '../../api/types'
import { playaudio, getaudio } from '../../common/functions'
import './PostGameScreen.css'
export function Postgame(props: {
  elements: WordSignature[]
  func: () => void
}) {
  return (
    <div className="postGameScreen">
      <ul>
        {props.elements.map((item) => (
          <li className="postGameElement" key={item.audio}>
            <button
              className="audioButton"
              onClick={() => playaudio(getaudio(item.audio))}
            ></button>
            <p className="postGameWord">{item.word}</p>
            <p className="postGameWord">{item.correctTranslate}</p>
          </li>
        ))}
      </ul>
      <button onClick={() => props.func()}></button>
    </div>
  )
}
