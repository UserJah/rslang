import React from 'react'
import { pidgeon } from './pidgeon.js'
import { ptero } from './pterodactyl'
import { turkey } from './turkey.js'
import { penguin } from './penguin.js'
import './birdimages.css'
export function pteroIMG() {
  return (
    <div
      className="ptero svgcontainer"
      dangerouslySetInnerHTML={{ __html: ptero }}
    ></div>
  )
}
export function pidgeionIMG() {
  return (
    <div
      className="pidgeon svgcontainer"
      dangerouslySetInnerHTML={{ __html: pidgeon }}
    ></div>
  )
}

export function turkeyIMG() {
  return (
    <div
      className="turkey svgcontainer"
      dangerouslySetInnerHTML={{ __html: turkey }}
    ></div>
  )
}
export function penguinIMG() {
  return (
    <div
      className="penguin svgcontainer"
      dangerouslySetInnerHTML={{ __html: penguin }}
    ></div>
  )
}
