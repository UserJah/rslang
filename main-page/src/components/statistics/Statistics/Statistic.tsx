import { Link } from 'react-router-dom'
import React from 'react'
import Categories from '../Categories/Categories'
import localStorageService from './../../../utils/LocalStorageService'
import AuthConstants from '../../../constants/Auth.constants'
import { IUserInfo } from '../../../constants/Auth.interfaces'
import classes from './Statistic.module.css'

const Statistic = () => {
  const local = localStorageService.getItem<IUserInfo>(
    AuthConstants.USER_KEY_STORAGE
  )

  return (
    <div className={classes.statistics}>
      <h2 className={classes.title}> Статистика</h2>
      <Link to="/" className={classes.btn}>
        На главную
      </Link>
      {local && local.isAuth ? (
        <>
          <Categories title="АУДИОВЫЗОВ" />
          <Categories title="СПРИНТ" />
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
