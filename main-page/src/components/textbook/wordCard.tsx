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

const WordCard = ({ props, color, group, change }) => {
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
      )}, 500)
  }
  const handleSetHardWord = async () => {
    (await getUserWord(props._id) ?
    setUserWordsTextBook(props._id, {difficulty: 'hard', optional : {isKnown : false, streak: props.userWord.optional.streak ? props.userWord.optional.streak : 0, lastaudio: props.userWord.optional.lastaudio ? props.userWord.optional.lastaudio : undefined, lastsprint: props.userWord.optional.lastsprint ? props.userWord.optional.lastsprint : undefined}}, 'PUT')
    : 
    setUserWordsTextBook(props._id, {difficulty: 'hard', optional : {isKnown : false, streak: 0, lastaudio: false, lastsprint: false}}))
    setUserDifficultyWord((userDifficultyWord: boolean) => userDifficultyWord ? false : true)
    change()
  }

  const handleSetNormalWord = async () => {
    setUserWordsTextBook(props._id, {difficulty: 'easy', optional : {isKnown : false, streak : props.userWord.optional.streak, lastaudio: props.userWord.optional.lastaudio, lastsprint: props.userWord.optional.lastsprint}}, 'PUT')
    setUserDifficultyWord((userDifficultyWord: boolean) => userDifficultyWord ? false : true)
    change()
  }

  const handleSetLearnedWorld = async () => {
    (await getUserWord(props._id) ?
    setUserWordsTextBook(props._id, {difficulty: 'easy', optional : {isKnown : true, streak: props.userWord.optional.streak ? props.userWord.optional.streak : 0, lastaudio: props.userWord.optional.lastaudio ? props.userWord.optional.lastaudio : undefined, lastsprint: props.userWord.optional.lastsprint ? props.userWord.optional.lastsprint : undefined}}, 'PUT')
    : 
    setUserWordsTextBook(props._id, {difficulty: 'easy', optional : {isKnown : true, streak: 0, lastaudio: false, lastsprint: false}}))
    setUserLearnedWord((userLearnedWord: boolean) => userLearnedWord ? false : true)
    change()
  }

  const handleSetUnlearnedWorld = async () => {
    setUserWordsTextBook(props._id, {difficulty: 'easy', optional : {isKnown : false, streak : props.userWord.optional.streak, lastaudio: props.userWord.optional.lastaudio, lastsprint: props.userWord.optional.lastsprint}}, 'PUT')
    setUserLearnedWord((userLearnedWord: boolean) => userLearnedWord ? false : true)
    change()
  }



  useEffect(() => {
    const isUserDifficultyWord = () => {
      if (localStorage.userInfo && props.userWord) {
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
        justifyContent: 'flex-start',
      }}
    >
      <CardMedia
        component="img"
        height="240"
        image={Path.base + props.image}
        alt={props.word}
      />
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 'calc(100% - 240px)'}}>
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
          
              {props.userWord && props.userWord.optional && props.userWord.optional.lastsprint === true ?
              <Typography component={'span'} color="green" sx={{ alignSelf: 'center', p:1}}>
                Спринт: угадано
              </Typography>
              : 
              props.userWord && props.userWord.optional && props.userWord.optional.lastsprint === false ? 
              <Typography component={'span'} color="red" sx={{ alignSelf: 'center', p:1}}>
                Спринт: не угадано
              </Typography> 
              : localStorage.userInfo ?
              <Typography component={'span'} color="gray" sx={{ alignSelf: 'center', p:1}}>
                Спринт: не попадалось
              </Typography> : null
            }
              {props.userWord && props.userWord.optional && props.userWord.optional.lastaudio === true?
                <Typography component={'span'} color="green" sx={{ alignSelf: 'center', p:1}}>
                  Аудиовызов: угадано
                </Typography> 
              : 
              props.userWord && props.userWord.optional && props.userWord.optional.lastaudio === false ? 
                <Typography component={'span'} color="red" sx={{ alignSelf: 'center', p:1}}>
                  Аудиовызов: не угадано
                </Typography> 
              : localStorage.userInfo ?
                <Typography component={'span'} color="gray" sx={{ alignSelf: 'center', p:1}}>
                  Аудиовызов: не попадалось
                </Typography> : null
              }
          
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
          {clicked ? (
            <StopCircleOutlined />
          ) : (
            <PlayArrow
              titleAccess='Воспроизвести'
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
                  titleAccess='Убрать из сложных'
                  sx={{ cursor: 'pointer' }}
                  onClick = {() => {handleSetNormalWord()}}
                />
                :
                <WatchLater
                  titleAccess='Сделать сложным'
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleSetHardWord()}
              /> 
            }

              <Spellcheck
                titleAccess='Изученное'
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  userLearnedWord ? handleSetUnlearnedWorld() : handleSetLearnedWorld()
                } }
              />
            </>
          ) : null}
        </CardActions>
      </div>
    </Card>
  )
}

export default WordCard
