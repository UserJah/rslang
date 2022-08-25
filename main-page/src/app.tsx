import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from './components/main/main'
import Layout from './pages/Layout'
import { Startscreen } from './sprint/StartScreen/startscreet'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="1" element={<h2>Учебник</h2>} />
        <Route path="2" element={<h2>Аудиовызов</h2>} />
        <Route path="3" element={<Startscreen />} />
        <Route path="4" element={<h2>Статистика</h2>} />
        <Route path="5" element={<h2>Словарь</h2>} />
      </Route>
    </Routes>
  )
}

export default App
