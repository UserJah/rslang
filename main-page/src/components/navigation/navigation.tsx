import React from 'react'
import Authorization from '../Auth/Authorization/Authorization'
import img from './../../assets/img/logo.svg'
import TemporalyDrawer from './drawer'
import './navigation.css'

const Navigation = () => {
  return (
    <div className="navbar">
      <TemporalyDrawer />
      <img src={img} alt="rs-logo" className="rs-logo" />
      <div className="button-group-user">
        <Authorization />
      </div>
    </div>
  )
}

export default Navigation
