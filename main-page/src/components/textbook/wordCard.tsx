import { Card, CardActions, CardContent, CardMedia } from '@mui/material'
import React, { useEffect, useState } from 'react'
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
  const playAudio = (arr: HTMLAudioElement[]) => {
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
    const arr = [new Audio(Path.base + props.audio), new Audio(Path.base + props.audioMeaning), new Audio(Path.base + props.audioExample)]
    setTimeout (() => {    setClicked(true)
      playAudio(arr)
      setTimeout(
        () => setClicked(false),
        (arr[0].duration + arr[1].duration + arr[2].duration) *
          1000
      )}, 100)
  }
  const handleSetHardWord = async () => {
    (await getUserWord(props._id) ?
    setUserWordsTextBook(props._id, {difficulty: 'hard', optional : {isKnown : false}}, 'PUT')
    : 
    setUserWordsTextBook(props._id, {difficulty: 'hard', optional : {isKnown : false}}))
    setUserDifficultyWord((userDifficultyWord: boolean) => userDifficultyWord ? false : true)
  }

  const handleSetNormalWord = async () => {
    await setUserWordsTextBook(props._id, {difficulty: 'normal', optional : {isKnown : false}}, 'PUT');
    setUserDifficultyWord((userDifficultyWord: boolean) => userDifficultyWord ? false : true)
  }

  const handleSetLearnedWorld = async () => {
    (await getUserWord(props._id) ?
    setUserWordsTextBook(props._id, {difficulty: 'easy', optional : {isKnown : true}}, 'PUT')
    : 
    setUserWordsTextBook(props._id, {difficulty: 'easy', optional : {isKnown : true}}))
    setUserLearnedWord((userLearnedWord: boolean) => userLearnedWord ? false : true)
  }

  const handleSetUnlearnedWorld = async () => {
    setUserWordsTextBook(props._id, {difficulty: 'easy', optional : {isKnown : false}}, 'PUT')
    setUserLearnedWord((userLearnedWord: boolean) => userLearnedWord ? false : true)
  }



  useEffect(() => {
    const isUserDifficultyWord = () => {
      if (localStorage.userInfo && props.userWord && group !== 7) {
        (props.userWord.difficulty === 'hard') ? setUserDifficultyWord(true) : null;
      }
    }
  
    const isUserLearnedWord = () => {
      if (localStorage.userInfo && props.userWord && props.userWord.optional && group !== 7) {
          props.userWord.optional.isKnown ? setUserLearnedWord(true) : null;
      }
    }

    isUserDifficultyWord()
    isUserLearnedWord()
  }, [])


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
