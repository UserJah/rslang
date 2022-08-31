import { Card, CardActions, CardContent, CardMedia } from '@mui/material'
import React, { useState } from 'react'
import { Path, Word } from '../../api/types'
import Typography from '@mui/material/Typography'
import './wordCard.css'
import { PlayArrow, Spellcheck, StopCircleOutlined, WatchLater } from '@mui/icons-material'

const WordCard = ({props, color}) => {
  const [clicked, setClicked] = useState(false)
  const [learned, setLearned] = useState(false)

  const htmlString = props.textExample

  const audioWord = new Audio(Path.base + props.audio),
        audioMeaning = new Audio(Path.base + props.audioMeaning),
        audioExample = new Audio(Path.base + props.audioExample)
  const arr = [audioWord, audioMeaning, audioExample]

  const playAudio = () => {
      setTimeout(() => {
        arr[0].play()
        setTimeout(() => {
          arr[1].play()
          setTimeout(() => {
            arr[2].play()
          }, arr[1].duration*1000)
        }, arr[0].duration*1000)
      })
  }

  const handlePlayIconClick = () => {
    setClicked(true)
    playAudio()
    setTimeout(() => setClicked(false), (audioWord.duration + audioMeaning.duration + audioExample.duration)*1000)
  }

  const handleLearnWordIconClick = () => {
    setLearned(true)
    console.log(learned)
  }

  return (
    <Card
      sx={{
        boxSizing: 'border-box',
        maxWidth: '265px',
        m: 2,
        bgcolor: learned ? 'gold' : color,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <CardMedia
        component="img"
        height="240"
        image={Path.base + props.image}
        alt={props.word}
      />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }} 
      >
        <Typography color="#black" variant="h5">
          {props.word} &mdash; {props.transcription}
        </Typography>
        <Typography gutterBottom color="gray">
          {props.wordTranslate}
        </Typography>

        <Typography
          dangerouslySetInnerHTML={{ __html: props.textMeaning }}
          color="#black"
          sx={{ alignSelf: 'stretch' }}
        />
        <Typography gutterBottom color="gray" sx={{ alignSelf: 'stretch' }}>
          {props.textMeaningTranslate}
        </Typography>
        <Typography
          dangerouslySetInnerHTML={{ __html: htmlString }}
          color="#black"
          sx={{ alignSelf: 'stretch' }}
        />
        <Typography color="gray" sx={{ alignSelf: 'stretch' }}>
          {props.textExampleTranslate}
        </Typography>
      </CardContent>
      <CardActions sx={{display: 'flex', justifyContent: 'space-around'}}>
          {clicked ? <StopCircleOutlined /> : <PlayArrow onClick={() => {clicked ?  null : handlePlayIconClick()}}/>}
          {
            localStorage.userInfo ? 
            <>
            <WatchLater sx={{color: learned ? 'gold' : 'black', cursor: 'pointer'}}/>
            <Spellcheck sx={{color: learned ? 'gold' : 'black', cursor: 'pointer'}} onClick={() => handleLearnWordIconClick()}/>
            </> : null
          }
          
      </CardActions>
    </Card>
  )
}

export default WordCard
