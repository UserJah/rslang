import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from './components/main/main'
import Layout from './pages/Layout'
import { Startscreen } from './sprint/StartScreen/startscreet'
import { Startscreen as AudioChallenge } from './audiochallenge/startscreen/startscreen'
import { TextBook } from './components/textbook/textBook'
import Statistic from './components/statistics/Statistics/Statistic'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route
          path="1"
          element={
            <h2>
              <TextBook />
            </h2>
          }
        />
        <Route path="2" element={<AudioChallenge/>} />
        <Route path="3" element={<Startscreen />} />
        <Route path="4" element={<Statistic />} />
      </Route>
    </Routes>
  )
}

export default App
