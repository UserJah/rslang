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
import {
  IGame,
  IStatistics,
  IUserInfo,
  ILongStat,
  IGraphData,
} from '../../../constants/Auth.interfaces'
import { TotalWordsGraph } from './../../statistics/longStat/TotalWordsGraph/TotalWordsGraph'

const dataNewWords: IGraphData = {
  labels: ['0'],
  datasets: [
    {
      label: 'новых за весь период обучения',
      data: [0],
      borderColor: 'blue',
      backgroundColor: 'blue',
    },
  ],
}

const dataLeanedWords: IGraphData = {
  labels: ['0'],
  datasets: [
    {
      label: 'изученных за весь период обучения',
      data: [0],
      borderColor: 'brown',
      backgroundColor: 'brown',
    },
  ],
}

const Statistic = () => {
  const [stat, setStat] = useState<IStatistics | null>(null)
  const [showStat, setShowStat] = useState<boolean>(false)
  const [averages, setAverages] = useState<Record<string, number> | null>(null)

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
          const result: IStatistics = await response.json()
          delete result.id

          console.log(result)

          if (
            result &&
            result.optional &&
            result.optional.long &&
            typeof result.optional.long === 'string'
          ) {
            const archiveStatDB: ILongStat[] = JSON.parse(result.optional.long)

            console.log(archiveStatDB)

            if (archiveStatDB) {
              dataNewWords.labels = [
                '0',
                ...archiveStatDB
                  .map((item) => new Date(item.date).toLocaleDateString())
                  .reverse(),
              ]

              dataNewWords.datasets[0].data = [
                0,
                ...archiveStatDB.map((item) => +item.new).reverse(),
              ]

              dataLeanedWords.labels = [
                '0',
                ...archiveStatDB
                  .map((item) => new Date(item.date).toLocaleDateString())
                  .reverse(),
              ]

              dataLeanedWords.datasets[0].data = [
                0,
                ...archiveStatDB.map((item) => +item.learned).reverse(),
              ]
            }
          }

          const percentageSprint = result.optional?.sprint?.percentage
          const percentageAudioChallenge =
            result.optional?.audiochallenge?.percentage
          const learnedWords = result.learnedWords

          const answersSprint = result.optional?.sprint?.newWords
          const answersAudioChallenge =
            result.optional?.audiochallenge?.newWords

          if (
            percentageSprint !== undefined &&
            percentageAudioChallenge !== undefined &&
            answersSprint !== undefined &&
            answersAudioChallenge !== undefined
          ) {
            const averagePercentage =
              percentageSprint && percentageAudioChallenge > 0
                ? Math.ceil(
                    (+(percentageSprint + percentageAudioChallenge).toFixed(2) *
                      100) /
                      2
                  )
                : Math.ceil(
                    +(percentageSprint + percentageAudioChallenge).toFixed(2) *
                      100
                  )

            const averageAnswers = answersSprint + answersAudioChallenge

            const averageValues = {
              learnedWords,
              averagePercentage,
              averageAnswers,
            }

            setAverages(averageValues)
          }

          setStat(result)
          setShowStat(true)
        }
      })()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showStat])

  return (
    <>
      {showStat && stat && averages ? (
        <div className={classes.content}>
          <div className={classes.btns}>
            <Typography className={classes.title} variant="h2" component="h2">
              статистика
            </Typography>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button variant="contained">На главную</Button>
            </Link>
          </div>

          <div
            style={{
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <div>
              <StatCard width={300} height={300}>
                <WordsStat
                  learnedWords={averages.learnedWords || 0}
                  averageAnswers={averages.averageAnswers || 0}
                />
              </StatCard>

              <StatCard width={300} height={300}>
                <AccuracyStat
                  averagePercentage={averages.averagePercentage || 0}
                />
              </StatCard>
            </div>

            <div>
              <StatCard width={500} height={300}>
                <GameStat
                  title="Аудиовызов"
                  cn="audio"
                  game={stat.optional?.audiochallenge as IGame}
                />
              </StatCard>
              <StatCard width={500} height={300}>
                <GameStat
                  title="Спринт"
                  cn="sprint"
                  game={stat.optional?.sprint as IGame}
                />
              </StatCard>
            </div>
          </div>
          <div
            style={{
              width: '90vw',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <TotalWordsGraph data={dataNewWords} />
            <TotalWordsGraph data={dataLeanedWords} />
          </div>
        </div>
      ) : (
        <Typography className={classes.fail} variant="h4" component="h2">
          Статистика доступна только зарегистрированным пользователям войдите в
          ваш аккаунт
        </Typography>
      )}
    </>
  )
}

export default Statistic
