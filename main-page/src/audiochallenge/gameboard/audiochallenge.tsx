import React ,{useState,useEffect}from "react";
import { prepareAudioChallenge,shuffle,handleWord} from '../../common/functions'
import { WordSignature } from "../../api/types";
import { Controls } from "../controls/controls";
import { Dots } from "../dots/dots";
import { PostGame } from "../endscreen/postgamescreen";
import './gameboard.css'

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
  function reset(){
    isFinish(false)
    setCounter(0)
    setGuessed([])
    setItems(shuffle(items))
  }

  function updateCounter(element:string){
    if (items[counter].wordTranslate === element) {
                  items[counter].guessedCorrect=true
                 setGuessed(guessed=>[...guessed,items[counter]])
                 handleWord(items[counter],true,'audiochallenge')
                }
                else{
                  items[counter].guessedCorrect=false
                  setGuessed(guessed=>[...guessed,items[counter]])
                  handleWord(items[counter],false,'audiochallenge')
                }
  if(counter!==items.length-1)setCounter(counter + 1);
else isFinish(true)

              }

  if (!load && !finish) {
    return <div>qwer</div>;
  } else if (!finish) {
    return (
      <div className="gameboard">
<div>
  <Dots arr={items} guessed={guessed}/>
</div>

      <div>
      <Controls items={items} updatefunc={updateCounter} counter={counter} load={load}/>
      </div>
      </div>
    );
  }
  else return (
    <PostGame guessed={guessed} reset={reset}/>
  )
}
