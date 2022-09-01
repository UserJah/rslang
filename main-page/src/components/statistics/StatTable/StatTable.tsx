import React from 'react'
import { IStatTableProps } from './StatTable.props'
import classes from './StatTable.module.css'

const StatTable = ({ game, words, date }: IStatTableProps) => {
  const dateStr = new Date(date).toLocaleDateString()
  return (
    <table className={classes.statTable}>
      <tbody>
        <tr className={classes.row}>
          <th className={classes.title}>Дата</th>
          <th className={classes.title}>Новые слова за день</th>
          <th className={classes.title}>Изучено слов</th>
          <th className={classes.title}>Правильно (%)</th>
          <th className={classes.title}>Серия правильных ответов</th>
        </tr>

        <tr className={classes.row}>
          <td className={classes.data}>{dateStr}</td>
          <td className={classes.data}>{game.answers}</td>
          <td className={classes.data}>{words}</td>
          <td className={classes.data}>{game.percentage}</td>
          <td className={classes.data}>{game.biggestStreak}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default StatTable
