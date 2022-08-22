import React from 'react'
import App from './app'
import * as ReactDOMClient from 'react-dom/client'
const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(<App />)
