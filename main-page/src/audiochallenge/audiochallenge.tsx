import React ,{useState,useEffect}from "react";
import { prepareAudioChallenge} from '../common/functions'
import { WordSignature } from "../api/types";
import { Controls } from "./controls";
import { Dots } from "./dots/dots";

export function AudioChallenge(props?: { page?: number; group?: number,fromPage?:boolean }) {
  const [items, setItems] = useState<WordSignature[]>([]);
  const [load, isLoad] = useState(false);
  const [finish, isFinish] = useState(false);
  const [counter, setCounter] = useState(0);
  const [guessed,setGuessed]=useState<WordSignature[]>([])
  useEffect(() => {
    const resp = async () => {
      const response = await prepareAudioChallenge(props?.page,props?.group,props?.fromPage);
      setItems(response);
      isLoad(true);
    };

    resp();
  }, [props?.fromPage, props?.group, props?.page]);

  function updateCounter(element:string){
    if (items[counter].wordTranslate === element) {
                  items[counter].guessedCorrect=true
                 setGuessed(guessed=>[...guessed,items[counter]])

                }
                else{
                  items[counter].guessedCorrect=false
                  setGuessed(guessed=>[...guessed,items[counter]])
                }
                console.log(guessed)
                setCounter(counter + 1);
              }

  if (!load) {
    return <div>qwer</div>;
  } else {
    return (
      <div>
<div>
  <Dots arr={items} guessed={guessed}/>
</div>

      <div>
      <Controls items={items} updatefunc={updateCounter} counter={counter} load={load}/>
      </div>
      </div>
    );
  }
}
