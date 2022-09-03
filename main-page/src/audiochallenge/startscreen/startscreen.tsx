import React, { useState} from 'react'
import { AudioChallenge } from '../gameboard/audiochallenge';

export function Startscreen(props?: { page?: number; group?: number, fromPage?:boolean}) {
  const [group, setGroup] = useState(0 || props?.group)
  const [start, setStart] = useState(false);
  if(!start && !props?.group)
      return (

      <div className="level_wrapper">
        <h2>Аудиовызов</h2>
        <p>Выберите уровень игры.Чем выше уровень,тем сложнее слова!</p>
        <p>Для управления используйте мышь или 1,2,3,4,5 для выбора соответствующего варианта</p>
       <p>После выбора варианта используйте Пробел для перехода к следующему слову</p>
             <button
          className="chose_level green"
          onClick={() => {
            setGroup(0)
            setStart(true)
          }}
        >
          Уровень 1
        </button>
        <button
          className="chose_level blue"
          onClick={() => {
            setGroup(1)
            setStart(true)
          }}
        >
          Уровень 2
        </button>
        <button
          className="chose_level yellow"
          onClick={() => {
            setGroup(2)
            setStart(true)
          }}
        >
          Уровень 3
        </button>
        <button
          className="chose_level orange"
          onClick={() => {
            setGroup(3)
            setStart(true)
          }}
        >
          Уровень 4
        </button>
        <button
          className="chose_level brightorange"
          onClick={() => {
            setGroup(4)
            setStart(true)
          }}
        >
          Уровень 5
        </button>
        <button
          className="chose_level red"
          onClick={() => {
            setGroup(5)
            setStart(true)
          }}
        >
          Уровень 6
        </button>
      </div>
    )
    else return(
      <AudioChallenge group={group} page={props?.page|| 29} fromPage={props?.fromPage}/>
    )
  }
