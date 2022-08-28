import React from "react";
import { WordSignature } from "../../api/types";

export function PostGame(props:{guessed:WordSignature[],reset:()=>void}){
 const a=props.guessed.map(element=>{

  return (<div key={element.id}>
    {element.word}
    {element.wordTranslate}
    {element.guessedCorrect}
    </div>
  )
 })
  return (
    <div>
   {a}
   <button onClick={props.reset}>
    RESET
   </button>
   </div>
  )
}
