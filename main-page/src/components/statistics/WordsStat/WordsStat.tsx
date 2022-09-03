import * as React from 'react'
import { Typography } from '@mui/material'
import { IWordsStatProps } from './WordsStatProps'

const WordsStat = ({ learnedWords, averageAnswers }: IWordsStatProps) => {
  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold' }}>
            {learnedWords}
          </Typography>
        </div>
        <div>
          <Typography variant="h5" component="h5" sx={{ fontWeight: 'bold' }}>
            cлов
          </Typography>
          <Typography variant="h5" component="h5">
            изучено
          </Typography>
        </div>
        <div />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <Typography variant="h3" component="h3" sx={{ fontWeight: 'bold' }}>
              {averageAnswers}
            </Typography>
          </div>
          <div>
            <Typography variant="h5" component="h5" sx={{ fontWeight: 'bold' }}>
              всего слов
            </Typography>
            <Typography variant="h5" component="h5">
              за день
            </Typography>
          </div>
        </div>
      </div>
    </>
  )
}

export default WordsStat
