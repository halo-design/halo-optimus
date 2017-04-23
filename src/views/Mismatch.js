import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

@connect(
  state => state.public.login
)
export default class Mismatch extends React.Component {
  render () {
    const { isLogin } = this.props
    return (<Redirect to={isLogin === 'false' ? '/login' : '/main'} />)
  }

}
