import React from 'react'
import { Route } from 'react-router-dom'
import { Startscreen as AudioChallenge } from '../audiochallenge/startscreen/startscreen'
import { Startscreen as Sprint } from '../sprint/StartScreen/startscreet'

const setTextBookGameRoutes = (gameName: string) => {
  const MAX_GROUPS = 7
  const MAX_PAGES = 30
  const routes = []

  for (let i = 1; i <= MAX_GROUPS; i++) {
    for (let j = 1; j < +MAX_PAGES; j++) {
      if (gameName === 'audioChallenge') {
        routes.push(
          <Route
            key={`gameName${j}`}
            path={`${gameName}/${i}/${j}`}
            element={<AudioChallenge group={i} page={j} fromPage={true} />}
          />
        )
      }

      if (gameName === 'sprint') {
        routes.push(
          <Route
            key={`gameName${j}`}
            path={`${gameName}/${i}/${j}`}
            element={<Sprint group={i} page={j} fromPage={true} />}
          />
        )
      }
    }
  }

  console.log(routes)

  return routes
}

export default setTextBookGameRoutes
