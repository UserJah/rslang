import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import * as ReactDOMClient from 'react-dom/client'
import App from './app'
import './index.css'

const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <Router>
    <App />
  </Router>
)
