import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

@connect(
  state => state.counter
)
export default class Mismatch extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectPath: '/main'
    }
  }

  componentWillMount () {
    const { count } = this.props
    if (count === 3) {
      this.setState({
        redirectPath: '/login'
      })
    }
  }

  render () {
    return (<Redirect to={this.state.redirectPath} />)
  }

}
