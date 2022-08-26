import React, { useState,useEffect } from 'react'
import {prepareAudioChallenge} from '../../common/functions'
export function Startscreen(props?: { page?: number; group?: number }) {
  const [group, setGroup] = useState(0 || props?.group)
  const [start, setStart] = useState(false)
  useEffect(() => {
    const resp = async () => {
      const response = console.log((await prepareAudioChallenge()))
    }

    resp()
  },[])

console.log()
  return (
    <div>
      1234567npm st
    </div>  )}
    /*return (

      <div className="level_wrapper">
        <h2>Спринт</h2>
        <p>Выберите уровень игры.Чем выше уровень,тем сложнее слова!</p>
        <p>Для управления используйте мышь или кнопки Влево и Вправо</p>
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
  }*/
