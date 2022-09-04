import React from 'react'

import { IPopUpProps } from './PopUpProps'
import classes from './PopUp.module.css'

const PopUp = ({ text }: IPopUpProps) => {
  return <div className={classes.popUp}>{text}</div>
}

export default PopUp
