import React from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

const Transition = ({ children, changeKey }) => (
  <CSSTransitionGroup
    transitionName='slide'
    transitionAppearTimeout={0}
    transitionEnterTimeout={0}
    transitionLeaveTimeout={0}
  >
    <span key={changeKey}>
      { children }
    </span>
  </CSSTransitionGroup>
)

export default Transition
