import React,{useState,useEffect,useRef} from "react";
export function Timer(props:{seconds:string,endFunc:()=>void,reset:number}) {
  const [time, setTime] = useState(Number(props.seconds));
  const [over, setOver] = useState(false);
  const countRef = useRef(over);
  countRef.current = over;
  const tick = () => {
    if (time === 0) {
      setOver(true);
      props.endFunc()

    } else {
      setTime(time - 1);

    }
  };
  useEffect(() => {
    const countdown = setInterval(() => tick(), 1000);
    return () =>clearInterval(countdown)
  });
  useEffect(()=>{
    setTime(Number(props.seconds))
  },[props.reset, props.seconds])

  return (
    <div>
      <p>{time}</p>
    </div>
  );
}
