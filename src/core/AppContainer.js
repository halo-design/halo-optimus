import React, { Component } from 'react'
import { Provider } from 'react-redux'
import App from './App'

export default class AppContainer extends Component {

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { store } = this.props
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
