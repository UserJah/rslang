import React, { useState, useEffect, useRef } from 'react'
import './timer.css'
export function Timer(props: {
  seconds: string
  endFunc: () => void
  reset: boolean
}) {
  const [time, setTime] = useState(Number(props.seconds))
  const [over, setOver] = useState(false)
  const countRef = useRef(over)
  countRef.current = over
  const tick = () => {
    if (time === 1) {
      setOver(true)
      props.endFunc()
    } else {
      setTime(time - 1)
    }
  }
  useEffect(() => {
    const countdown = setInterval(() => tick(), 1000)
    return () => clearInterval(countdown)
  })
  useEffect(() => {
    setTime(Number(props.seconds))
    setOver(false)
  }, [props.reset, props.seconds])
function timing(time:number,over:boolean){
  if (over || props.reset) return null
  else if (time<10) return `0${time}`
  else return time
}
  return (
    <div>
      <p className='timer'>{timing(time,over)}</p>
    </div>
  )
}
