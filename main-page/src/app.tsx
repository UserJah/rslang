import React, { useState } from 'react'
import TemporalyDrawer from './components/drawer'
import Navigation from './components/navigation'

const App = () => {
  const [state, setState] = useState(false)

  return (
    <>
      <Navigation />
      <TemporalyDrawer props={(state, setState)} />
    </>
  )
}

export default App
