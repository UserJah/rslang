import * as React from 'react'
import { Typography } from '@mui/material'
import { IGameStatProps } from './GameStatProps'
import classes from './GameStat.module.css'

const GameStat = ({ title, cn, game }: IGameStatProps) => {
  const classType = cn === 'audio' ? classes.audio : classes.sprint

  return (
    <section className={classes.section}>
      <Typography className={classType} variant="h4" component="h4">
        {title}
      </Typography>
      <div className={classes.rows}>
        <p>{game ? game.newWords : 0}</p>
        <p>Новые слова</p>
      </div>
      <div className={classes.rows}>
        <p>
          {game && game.percentage
            ? Math.ceil(+game.percentage.toFixed(2) * 100)
            : 0}
          %
        </p>
        <p>Точность</p>
      </div>
      <div className={classes.rows}>
        <p>{game ? game.biggestStreak : 0}</p>
        <p>Лучшая серия</p>
      </div>
    </section>
  )
}
export default GameStat
