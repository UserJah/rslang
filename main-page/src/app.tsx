import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from './components/main/main'
import Layout from './pages/Layout'
import { Startscreen as Sprint } from './sprint/StartScreen/startscreet'
import { Startscreen as AudioChallenge } from './audiochallenge/startscreen/startscreen'
import { TextBook } from './components/textbook/textBook'
import Statistic from './components/statistics/Statistics/Statistic'
import setTextBookGameRoutes from './utils/setTextBookGameRoutes'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="1" element={<TextBook />} />
        <Route path="2" element={<AudioChallenge />} />
        <Route path="3" element={<Sprint />} />
        <Route path="4" element={<Statistic />} />
        {setTextBookGameRoutes('audio')}
        {setTextBookGameRoutes('sprint')}
        <Route path="*" element={<Main />} />
      </Route>
    </Routes>
  )
}

export default App
