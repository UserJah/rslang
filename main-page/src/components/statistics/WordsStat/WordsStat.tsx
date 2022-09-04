import * as React from 'react'
import { Typography } from '@mui/material'
import { IWordsStatProps } from './WordsStatProps'

const WordsStat = ({ learnedWords }: IWordsStatProps) => {
  return (
    <>
      <div>
        <Typography
          variant="h2"
          component="h2"
          sx={{ fontWeight: 'bold', marginTop: 10 }}
        >
          {learnedWords}
        </Typography>
      </div>
      <div>
        <Typography
          variant="h5"
          component="h5"
          sx={{ fontWeight: 'bold', marginTop: 10 }}
        >
          cлов
        </Typography>
        <Typography variant="h5" component="h5">
          изучено
        </Typography>
      </div>
    </>
  )
}

export default WordsStat
