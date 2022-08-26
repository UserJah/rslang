import React from 'react'
import img from './../../assets/img/logo.svg'
import TemporalyDrawer from './drawer'
import LoginModal from '../LoginModal/LoginModal'
import RegisterModal from '../RegisterModal/RegisterModal'
import './navigation.css'

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  bgcolor: '#ffffff',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

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
