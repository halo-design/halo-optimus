import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './fade.css'

export default class AnimateContainer extends React.Component {

  componentWillMount () {
    // 这是防止页面被拖拽
    document.body.addEventListener('touchmove', (ev) => {
      ev.preventDefault()
    })
  }

  render () {
    return (
      <ReactCSSTransitionGroup
        transitionName='fade'
        component='div'
        transitionEnterTimeout={3000}
        transitionLeaveTimeout={3000}
      >
        {React.cloneElement(this.props.children, {
          key: this.props.pathname
        })}
      </ReactCSSTransitionGroup>
    )
  }
}
