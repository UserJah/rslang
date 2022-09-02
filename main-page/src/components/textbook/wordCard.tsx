import { Card, CardActions, CardContent, CardMedia } from '@mui/material'
import React, { useState } from 'react'
import { Path } from '../../api/types'
import Typography from '@mui/material/Typography'
import './wordCard.css'
import {
  DoneAll,
  PlayArrow,
  Spellcheck,
  StopCircleOutlined,
  WatchLater,
} from '@mui/icons-material'
import { getUserWord, setUserWordsTextBook } from '../../common/functions'

const WordCard = ({ props, color }) => {
  const [clicked, setClicked] = useState(false)
  const [learned, setLearned] = useState(false)
  const [userWord, setUserWord] = useState(false)

  const htmlString = props.textExample

  const arr = [new Audio(Path.base + props.audio), new Audio(Path.base + props.audioMeaning), new Audio(Path.base + props.audioExample)]

  const playAudio = () => {
    setTimeout(() => {
      arr[0].play()
      setTimeout(() => {
        arr[1].play()
        setTimeout(() => {
          arr[2].play()
        }, arr[1].duration * 1000)
      }, arr[0].duration * 1000)
    })
  }

  const handlePlayIconClick = () => {
    setClicked(true)
    playAudio()
    setTimeout(
      () => setClicked(false),
      (arr[0].duration + arr[1].duration + arr[2].duration) *
        1000
    )
  }
  const handleSetHardWord = async () => {
    (await getUserWord(props.id) ?
    setUserWordsTextBook(props.id, {difficulty: 'hard', optional : {isKnown : false}}, 'PUT')
    : 
    setUserWordsTextBook(props.id, {difficulty: 'hard', optional : {isKnown : false}}))
    setUserWord((userWord: boolean) => userWord ? false : true)
  }
  
  const isUserWord = async () => {
    if (localStorage.userInfo && await getUserWord(props.id)) {
      (await getUserWord(props.id))?.difficulty.includes('hard') ? setUserWord(true) : null
    }
  }

  isUserWord()

  const handleSetNormalWord = async () => {
    await setUserWordsTextBook(props.id, {difficulty: 'normal', optional : {isKnown : false}}, 'PUT');
    setUserWord((userWord: boolean) => userWord ? false : true)
  }

  const handleLearnWordIconClick = () => {
    return
  }

  return (
    <Card
      sx={{
        boxSizing: 'border-box',
        maxWidth: '265px',
        m: 2,
        bgcolor: userWord ? 'brown' : color,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
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
      <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
        {clicked ? (
          <StopCircleOutlined />
        ) : (
          <PlayArrow
            sx={{cursor: 'pointer'}}
            onClick={() => {
              clicked ? null : handlePlayIconClick()
            }}
          />
        )}
        {localStorage.userInfo ? (
          <>
          {
            userWord ? 
              <DoneAll 
                sx={{ color: learned ? 'gold' : 'black', cursor: 'pointer' }}
                onClick = {() => {handleSetNormalWord()}}
              />
              :
              <WatchLater
              sx={{ color: learned ? 'gold' : 'black', cursor: 'pointer' }}
              onClick={() => handleSetHardWord()}
            /> 
          }

            <Spellcheck
              sx={{ color: learned ? 'gold' : 'black', cursor: 'pointer' }}
              onClick={() => handleLearnWordIconClick()}
            />
          </>
        ) : null}
      </CardActions>
    </Card>
  )
}

export default WordCard
