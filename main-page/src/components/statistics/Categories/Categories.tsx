import React from 'react'
import { CategoryProps } from './Categories.props'
import StatTable from '../StatTable/StatTable'
import classes from './Categories.module.css'

const Categories = ({ title, id, token }: CategoryProps) => {
  return (
    <div className={classes.categories}>
      <h3 className={classes.catTitle}>{title}</h3>
      <StatTable id={id} token={token} />
    </div>
  )
}

export default Categories
