import React, { useEffect, useState } from 'react'
import { IStat } from '../../../constants/Auth.interfaces'

import api from './../../../utils/AuthAPI'
import classes from './StatTable.module.css'
import { IStatTableProps } from './StatTable.props'

const StatTable = ({ id, token }: IStatTableProps) => {
  const statMok: IStat = {
    learnedWords: 7,
    optional: {
      dayWords: '20',
      words: '50',
      percentage: '80%',
      date: new Date(),
      series: '5',
    },
  }

  const [showStat, setSow] = useState(false)

  const [stat, SetStat] = useState<IStat | null>(null)

  const getStat = async () => {
    const response = await api.getStat(id, token)

    const stat = await response?.json()

    return stat
  }

  useEffect(() => {
    api.updateStat(id, token, statMok)
  }, [])

  useEffect(() => {
    getStat().then((resp: IStat) => {
      if (resp) {
        console.log(resp.optional.date.toString().split('-'))

        SetStat(resp)

        setSow(true)
      }
    })
  }, [])

  useEffect(() => {
    console.log('rernder')
  }, [showStat])

  return (
    <table>
      <tr className={classes.row}>
        <th className={classes.title}>Дата</th>
        <th className={classes.title}>Новые слова за день</th>
        <th className={classes.title}>Изучено слов</th>
        <th className={classes.title}>Правильно (%)</th>
        <th className={classes.title}>Серия правильных ответов</th>
      </tr>

      {stat && stat.optional && (
        <tr className={classes.row}>
          <td className={classes.data}>{stat.optional.date.toString()}</td>
          <td className={classes.data}>{stat.learnedWords}</td>
          <td className={classes.data}>{stat.optional.dayWords}</td>
          <td className={classes.data}>{stat.optional.percentage}</td>
          <td className={classes.data}>{stat.optional.series}</td>
        </tr>
      )}
    </table>
  )
}

export default StatTable
