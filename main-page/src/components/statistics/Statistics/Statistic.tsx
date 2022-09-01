import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Categories from '../Categories/Categories'
import localStorageService from './../../../utils/LocalStorageService'
import AuthConstants from '../../../constants/Auth.constants'
import {
  IGame,
  IStatistics,
  IUserInfo,
} from '../../../constants/Auth.interfaces'
import api from './../../../utils/AuthAPI'
import classes from './Statistic.module.css'

const Statistic = () => {
  const [stat, setStat] = useState<IStatistics | null>(null)
  const [show, setShow] = useState<boolean>(false)

  const getStatAsync = async (): Promise<void> => {
    const local = localStorageService.getItem<IUserInfo>(
      AuthConstants.USER_KEY_STORAGE
    )
    if (local) {
      const stat = await api.getStat(
        local.userId as string,
        local.token as string
      )

      if (stat && stat.status === 200) {
        const resp = await stat.json()

        setStat(resp)
        setShow(true)
      }
    }
  }

  useEffect(() => {
    getStatAsync()
  }, [show])

  return (
    <div className={classes.statistics}>
      <h2 className={classes.title}> Статистика</h2>
      <Link to="/" className={classes.btn}>
        На главную
      </Link>
      {show && stat && stat.optional ? (
        <>
          <Categories
            title="АУДИОВЫЗОВ"
            words={stat.learnedWords}
            game={stat.optional.audiochallenge as IGame}
            date={stat.optional.date}
          />
          <Categories
            title="СПРИНТ"
            words={stat.learnedWords}
            game={stat.optional.sprint as IGame}
            date={stat.optional.date}
          />
        </>
      ) : (
        <h2 className={classes.unAuth}>
          Статистика доступна только зарегистрированным пользователям
        </h2>
      )}
    </div>
  )
}

export default Statistic
