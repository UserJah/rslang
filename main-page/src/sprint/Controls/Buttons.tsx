import React,{useEffect, useState} from "react";
import { Button } from "@mui/material";
import {getaudio,playaudio} from '../../common/functions'
import { WordSignature } from "../../api/types";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import './Buttons.css'

export function Morebuttons(props:{elems:WordSignature[],updatefunc:(correct:boolean,elem:WordSignature)=>void,known:WordSignature[]}) {
  const [counter, setCounter] = useState(0);

  useEffect(()=>{
    function keyboardhadler(evt:KeyboardEvent):void{
      if (evt.code==="ArrowLeft"){
        props.updatefunc(false,props.elems[counter])
        setCounter(counter + 1)
        }
        if(evt.code==='ArrowRight'){
          props.updatefunc(true,props.elems[counter])
          setCounter(counter + 1)
        }
    }
    document.addEventListener('keydown',keyboardhadler)
    return ()=>document.removeEventListener('keydown',keyboardhadler)
  },[counter, props])


  return (
    <div className="Buttoncontainer" >
      <button
        className="word"
        color='secondary'
        onClick={() => playaudio(getaudio(props.elems[counter].audio))}
      ><VolumeUpIcon
      color='secondary'
      /></button>


      <p  className="wordText">А правда,что
      <span className='wordtext'> {props.elems[counter].word}</span> переводится как <span className="wordtext">{props.elems[counter].translate}</span>? </p>

      <div className="control_container">
      <Button className="left"
      tabIndex={0}
      variant="contained"
      color="error"
      onClick={() => {
      props.updatefunc(false,props.elems[counter])
        setCounter(counter + 1)}}>
        WRONG!!!!!111</Button>

      <Button
        className="right"
        variant="contained"
        color="success"
          onClick={() => {
          props.updatefunc(true,props.elems[counter])
          console.log(counter)
          setCounter(counter + 1)}}

      > RIGHT!!!!1111</Button>
      </div>
    </div>
  );
}
