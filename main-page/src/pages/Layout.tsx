import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/footer'
import Navigation from '../components/navigation/navigation'

const Layout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
