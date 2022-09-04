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
        <Route path="2" element={<AudioChallenge group={1} />} />
        <Route path="3" element={<Startscreen />} />
        <Route path="4" element={<Statistic />} />
        <Route
          path="audio/hard/1"
          element={<AudioChallenge page={0} group={0} />}
        />
        <Route
          path="audio/hard/2"
          element={<AudioChallenge page={1} group={1} />}
        />
        <Route
          path="audio/hard/3"
          element={<AudioChallenge page={2} group={2} />}
        />
        <Route
          path="audio/hard/4"
          element={<AudioChallenge page={3} group={3} />}
        />
        <Route
          path="audio/hard/5"
          element={<AudioChallenge page={4} group={4} />}
        />
        <Route
          path="audio/hard/6"
          element={<AudioChallenge page={5} group={5} />}
        />
        <Route
          path="audio/hard/7"
          element={<AudioChallenge page={6} group={6} />}
        />
        <Route
          path="sprint/hard/1"
          element={<Startscreen page={0} group={0} fromPage={true} />}
        />
        <Route
          path="sprint/hard/2"
          element={<Startscreen page={1} group={1} fromPage={true} />}
        />
        <Route
          path="sprint/hard/3"
          element={<Startscreen page={2} group={2} fromPage={true} />}
        />
        <Route
          path="sprint/hard/4"
          element={<Startscreen page={3} group={3} fromPage={true} />}
        />
        <Route
          path="sprint/hard/5"
          element={<Startscreen page={4} group={4} fromPage={true} />}
        />
        <Route
          path="sprint/hard/6"
          element={<Startscreen page={5} group={5} fromPage={true} />}
        />
        <Route
          path="sprint/hard/7"
          element={<Startscreen page={6} group={6} fromPage={true} />}
        />
      </Route>
    </Routes>
  )
}

export default App
