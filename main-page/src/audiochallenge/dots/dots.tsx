import React, { useEffect } from "react";
import { WordSignature } from "../../api/types";
import './dots.css'
export function Dots(props:{arr:WordSignature[],guessed:WordSignature[]}){

  const pre=Array(props.arr.length).fill(0)
  const dots=pre.map((elem,index)=>{

    return (
      <div className='dot' key={index+'xzcvzxcv'}>

      </div>
    )
  })

  useEffect(()=>

  props.guessed.forEach((elem,index)=>{

    if (elem.guessedCorrect===true){
     document.getElementsByClassName('dot')[index].classList.add('greendot')

      }
    if (elem.guessedCorrect===false){
      document.getElementsByClassName('dot')[index].classList.add('reddot')
    }
  }),[dots, props.guessed])




  return(
    <div className="dotcontainer">
{dots}
    </div>
  )

}
