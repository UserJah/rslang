import React from 'react'
import LoginModal from '../LoginModal'
import RegisterModal from '../RegisterModal'
import img from './../../assets/img/logo.svg'
import TemporalyDrawer from './drawer'
import './navigation.css'

const Navigation = () => {
  return (
    <div className="navbar">
      <TemporalyDrawer />
      <img src={img} alt="rs-logo" className="rs-logo" />
      <div className="button-group-user">
        <LoginModal />
        <RegisterModal />
      </div>
    </div>
  )
}

export default Navigation
