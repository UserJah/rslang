import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material'
import StatCard from '../StatCard/StatCard'
import GameStat from '../GameStat/GameStat'
import WordsStat from '../WordsStat/WordsStat'
import AccuracyStat from '../AccuracyStat/AccuracyStat'
import api from './../../../utils/AuthAPI'
import localStorageService from './../../../utils/LocalStorageService'
import AuthConstants from '../../../constants/Auth.constants'
import classes from './Statistic.module.css'
import { IStatistics, IUserInfo } from '../../../constants/Auth.interfaces'

const Statistic = () => {
  const [stat, setStat] = useState<IStatistics | null>(null)
  const [showStat, setShowStat] = useState<boolean>(false)

  useEffect(() => {
    const local: IUserInfo | null = localStorageService.getItem(
      AuthConstants.USER_KEY_STORAGE
    )

    if (local) {
      (async () => {
        const id = local.userId as string
        const token = local.token as string

        const response = await api.getStat(id, token)
        if (response && response.status === 200) {
          const result = await response.json()
          delete result.id

          setStat(result)
          setShowStat(true)
        }
      })()
    }
  }, [showStat])

  return (
    <>
      {showStat && stat ? (
        <div className={classes.content}>
          <div className={classes.btns}>
            <Typography variant="h2" component="h2">
              статистика
            </Typography>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button variant="contained">На главную</Button>
            </Link>
          </div>

          <div className={classes.container}>
            <div>
              <StatCard width={300} height={300}>
                <WordsStat />
              </StatCard>

              <StatCard width={300} height={300}>
                <AccuracyStat />
              </StatCard>
            </div>

            <div>
              <StatCard width={500} height={300}>
                <GameStat title="Аудиовызов" cn="audio" />
              </StatCard>
              <StatCard width={500} height={300}>
                <GameStat title="Спринт" cn="sprint" />
              </StatCard>
            </div>
          </div>
        </div>
      ) : (
        <Typography className={classes.fail} variant="h4" component="h2">
          Статистика доступна только зарегистрированным пользователям
        </Typography>
      )}
    </>
  )
}

export default Statistic
