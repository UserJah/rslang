import React from 'react'
import Footer from './components/footer/footer'
import Main from './components/main/main'
import Navigation from './components/navigation/navigation'
import { TextBook } from './components/textbook/textBook'

const App = () => {
  return (
    <>
      <Navigation />
      <TextBook />
      <Footer />
    </>
  )
}

export default App
