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

const WordCard = ({ props, color, group }) => {
  const [clicked, setClicked] = useState(false)
  const [userDifficultyWord, setUserDifficultyWord] = useState(false)
  const [userLearnedWord, setUserLearnedWord] = useState(false)

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
    (await getUserWord(group === 7 ? props._id : props.id) ?
    setUserWordsTextBook(group === 7 ? props._id : props.id, {difficulty: 'hard', optional : {isKnown : false}}, 'PUT')
    : 
    setUserWordsTextBook(group === 7 ? props._id : props.id, {difficulty: 'hard', optional : {isKnown : false}}))
    setUserDifficultyWord((userDifficultyWord: boolean) => userDifficultyWord ? false : true)
    console.log(userDifficultyWord);
  }

  const handleSetNormalWord = async () => {
    await setUserWordsTextBook(group === 7 ? props._id : props.id, {difficulty: 'normal', optional : {isKnown : false}}, 'PUT');
    setUserDifficultyWord((userDifficultyWord: boolean) => userDifficultyWord ? false : true)
    console.log(userDifficultyWord);
  }

  const handleSetLearnedWorld = async () => {
    (await getUserWord(group === 7 ? props._id : props.id) ?
    setUserWordsTextBook(group === 7 ? props._id : props.id, {difficulty: 'easy', optional : {isKnown : true}}, 'PUT')
    : 
    setUserWordsTextBook(group === 7 ? props._id : props.id, {difficulty: 'easy', optional : {isKnown : true}}))
    setUserLearnedWord((userLearnedWord: boolean) => userLearnedWord ? false : true)
  }

  const handleSetUnlearnedWorld = async () => {
    setUserWordsTextBook(group ===7 ? props._id : props.id, {difficulty: 'easy', optional : {isKnown : false}}, 'PUT')
    setUserLearnedWord((userLearnedWord: boolean) => userLearnedWord ? false : true)
  }

  const isUserDifficultyWord = async () => {
    if (localStorage.userInfo && await getUserWord(group ===7 ? props._id : props.id)) {
      (await getUserWord(group ===7 ? props._id : props.id))?.difficulty.includes('hard') ? setUserDifficultyWord(true) : null
    }
  }
  
  const isUserLearnedWord = async () => {
    if (localStorage.userInfo && await getUserWord(props.id)) {
      (await getUserWord(group ===7 ? props._id : props.id))?.optional?.isKnown ? setUserLearnedWord(true) : null
    }
  }

  if (group !== 7) {
    isUserDifficultyWord()
    isUserLearnedWord()
  }


  return (
    <Card
      sx={{
        boxSizing: 'border-box',
        maxWidth: '265px',
        m: 2,
        bgcolor: userLearnedWord ? 'gold' : ( userDifficultyWord? 'brown' : color),
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
          {userLearnedWord ? null :  
          
            userDifficultyWord ? 
              <DoneAll
                sx={{ cursor: 'pointer' }}
                onClick = {() => {handleSetNormalWord()}}
              />
              :
              <WatchLater
              sx={{ cursor: 'pointer' }}
              onClick={() => handleSetHardWord()}
            /> 
          }

            <Spellcheck
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                userLearnedWord ? handleSetUnlearnedWorld() : handleSetLearnedWorld()
              } }
            />
          </>
        ) : null}
      </CardActions>
    </Card>
  )
}

export default WordCard
