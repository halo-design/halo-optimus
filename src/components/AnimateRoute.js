import React from 'react'
import { Route } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const AnimateRoute = ({ transition, ...props }) => (
  <Route render={({ location }) => (
    <ReactCSSTransitionGroup
      transitionName={transition}
      transitionAppearTimeout={0}
      transitionEnterTimeout={0}
      transitionLeaveTimeout={0}
    >
      <Route
        location={location}
        key={location.pathname}
        {...props}
      />
    </ReactCSSTransitionGroup>
  )} />
)

export default AnimateRoute
