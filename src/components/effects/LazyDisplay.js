import React from 'react'

export default class LazyDisplay extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      remove: true
    }
  }

  clearTimer () {
    this.delayTimer && clearTimeout(this.delayTimer)
  }

  componentWillReceiveProps (nextProps, nextState) {
    const { enterDelay, leaveDelay, visibleKey } = this.props
    if (nextProps.visibleKey === visibleKey) {
      return
    }
    this.clearTimer()
    this.delayTimer = setTimeout(() => {
      this.setState({
        remove: visibleKey
      })
    }, visibleKey ? leaveDelay : enterDelay)
  }

  componentWillUnmount () {
    this.clearTimer()
  }

  render () {
    const { children } = this.props
    const { remove } = this.state
    return remove ? null : children
  }
}
