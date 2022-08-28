import React from 'react'
import { CategoryProps } from './Categories.props'
import StatTable from '../StatTable/StatTable'
import classes from './Categories.module.css'

const Categories = ({ title }: CategoryProps) => {
  return (
    <div className={classes.categories}>
      <h3 className={classes.catTitle}>{title}</h3>

      <StatTable />
    </div>
  )
}

export default Categories
