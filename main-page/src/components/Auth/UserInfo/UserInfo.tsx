import React from 'react'
import { IUserInfo } from '../../../constants/Auth.interfaces'
import classes from './UserInfo.module.css'

const UserInfo = ({ name }: IUserInfo) => {
  return <div className={classes.user}>{`Привет, ${name}`}</div>
}

export default UserInfo
