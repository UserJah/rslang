import React from 'react'
import './preloader.css'

export function Preloader() {
  return (
    <div className="loader">
      <span className="ball"></span>
      <span className="ball2"></span>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  )
}
