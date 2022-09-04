import React from 'react'
import { Route } from 'react-router-dom'
import { Startscreen as AudioChallenge } from '../audiochallenge/startscreen/startscreen'
import { TextBookConstants } from '../constants/TextBook.constants'
import { Startscreen as Sprint } from '../sprint/StartScreen/startscreet'

const setTextBookGameRoutes = (gameName: string) => {
  const routes = []

  for (let i = 1; i <= TextBookConstants.MAX_GROUPS; i++) {
    for (let j = 1; j <= TextBookConstants.MAX_PAGES; j++) {
      if (gameName === 'audioChallenge') {
        routes.push(
          <Route
            key={`gameName${j}`}
            path={`${gameName}/${i}/${j}`}
            element={
              <AudioChallenge group={i - 1} page={j - 1} fromPage={true} />
            }
          />
        )
      }

      if (gameName === 'sprint') {
        routes.push(
          <Route
            key={`gameName${j}`}
            path={`${gameName}/${i}/${j}`}
            element={<Sprint group={i - 1} page={j - 1} fromPage={true} />}
          />
        )
      }
    }
  }

  console.log(routes)

  return routes
}

export default setTextBookGameRoutes
