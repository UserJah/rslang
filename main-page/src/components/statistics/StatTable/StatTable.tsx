import React from 'react'
import classes from './StatTable.module.css'

const StatTable = () => {
  return (
    <table>
      <tr className={classes.row}>
        <th className={classes.title}>Дата</th>
        <th className={classes.title}>Новые слова за день</th>
        <th className={classes.title}>Изучено слов</th>
        <th className={classes.title}>Правильно (%)</th>
        <th className={classes.title}>Серия правильных ответов</th>
      </tr>

      <tr className={classes.row}>
        <td className={classes.data}>28-08-2022</td>
        <td className={classes.data}>15</td>
        <td className={classes.data}>10</td>
        <td className={classes.data}>90%</td>
        <td className={classes.data}>8</td>
      </tr>
    </table>
  )
}

export default StatTable
