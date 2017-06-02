import React from 'react'
import { Switch, Route } from 'react-router-dom'

export default (parentPath, routeList) => (
  <Switch>
    {
      routeList.map((item, i) => {
        let config = item
        if (parentPath && 'path' in item) {
          config.path = parentPath + item.path
        }
        return (
          <Route
            key={i}
            {...config}
          />
        )
      })
    }
  </Switch>
)
