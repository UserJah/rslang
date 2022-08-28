import React from 'react'
import Categories from '../Categories/Categories'
import classes from './Statistic.module.css'

//TODO plug in the rottnig

const Statistic = () => {
  return (
    <div className={classes.statistics}>
      <h2 className={classes.title}> Статистика</h2>
      <a href="/" className={classes.btn}>
        На главную
      </a>
      <Categories title="АУДИОВЫЗОВ" />
      <Categories title="СПРИНТ" />
    </div>
  )
}

export default Statistic
