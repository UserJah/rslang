import React from 'react'
import { Link } from 'react-router-dom'
import Authorization from '../Auth/Authorization/Authorization'
import img from './../../assets/img/logo.svg'
import TemporalyDrawer from './drawer'
import './navigation.css'

const Navigation = () => {
  return (
    <div className="navbar">

      <TemporalyDrawer />
      <Link to={'/'}>
        <img src={img} alt="rs-logo" className="rs-logo" />
      </Link>
      <div className="button-group-user">
        <Authorization />
      </div>
    </div>
  )
}

export default Navigation
