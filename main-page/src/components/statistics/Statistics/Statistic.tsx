import { Link } from 'react-router-dom'
import React from 'react'
import Categories from '../Categories/Categories'
import classes from './Statistic.module.css'

//TODO plug in the rottnig

const Statistic = () => {
  return (
    <div className={classes.statistics}>
      <h2 className={classes.title}> Статистика</h2>
      <Link to="/" className={classes.btn}>
        На главную
      </Link>
      <Categories title="АУДИОВЫЗОВ" />
      <Categories title="СПРИНТ" />
    </div>
  )
}

export default Statistic
