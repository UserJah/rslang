import React, { useEffect } from "react";
import { WordSignature } from "../../api/types";
import { playaudio,getaudio } from "../../common/functions";
import './controls.css'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
export function Controls(props:{items:WordSignature[],updatefunc:(element:string)=>void,counter:number,load:boolean}){
  useEffect(()=>{
    document.body.click()
    playaudio(getaudio(props.items[props.counter].audio))

  },[props.counter, props.items,props.load])
return(<div>
<div className="audio">
<button onClick={() => playaudio(getaudio(props.items[props.counter].audio))}>
<VolumeUpIcon sx={{fontSize: 90}}/>
</button>
  </div>
  <div className="variants">

        {(props.items[props.counter].variant as string[]).map((element) => {

           return  <button key={props.items[props.counter].id+`${element}`}
              onClick={() => props.updatefunc(element)}
            >
              {element}
            </button>

        })}
      </div>
      </div>
)
}
