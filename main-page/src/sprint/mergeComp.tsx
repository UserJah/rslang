import React ,{useState,useEffect}from "react";
import {Card} from './GameScreen'
import {Timer} from './Timer/Timer'
import { WordSignature } from "../api/types";
import { prepare } from "../common/functions";
export function Game(props:{group:number,page:number}){
  const [end,setEnd]= useState(false)
  const [again,setAgain]=useState(1)
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<WordSignature[]>([]);
  function updateEnd(){
    setEnd(true)
  }
  function playAgain(){
    console.log(again)
    setEnd(false)
    setAgain(again+1)
  }

  useEffect(() => {
    const resp = async () => {
      const response = await prepare(props.page,props.group) as WordSignature[];

      setIsLoaded(true);
      setItems(response);
    };

    resp();

  }, [props.group, props.page]);
  if (!isLoaded) {
    return <div>Загрузка...</div>;
  }
  else if (again){
  return (
  <div>
  <Timer seconds="1000" endFunc={updateEnd} reset={again}/>
      <Card items={items} end={end} func={playAgain} reset={again}/>
  </div>)}



}
