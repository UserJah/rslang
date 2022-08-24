import { Card, CardContent, CardMedia } from '@mui/material'
import React from 'react'
import { Path, Word } from '../../api/types'
import Typography from '@mui/material/Typography'
import './wordCard.css'

const WordCard = (props: Word) => {
  const htmlString = props.textExample
  const audioWord = new Audio(Path.base + props.audio),
    audioMeaning = new Audio(Path.base + props.audioMeaning),
    audioExample = new Audio(Path.base + props.audioExample)
  const playAudio = () => {
    const arr = [audioWord, audioMeaning, audioExample]
    audioWord.play()
  }

  return (
    <Card
      sx={{
        maxWidth: '265px',
        m: 2,
        bgcolor: '#ffdba4',
      }}
    >
      <CardMedia
        component="img"
        height="240"
        image={Path.base + props.image}
        alt={props.word}
        onClick={() => {
          playAudio()
        }}
        sx={{ cursor: 'pointer' }}
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
    </Card>
  )
}

export default WordCard
