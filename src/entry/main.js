import React from 'react'
import ReactDOM from 'react-dom'
import createStore from 'UTIL/createStore'
import AppContainer from 'CORE/AppContainer'

const store = createStore()
const MOUNT_NODE = document.getElementById('MOUNT_NODE')

const render = () => {
  ReactDOM.render(
    <AppContainer store={store} />,
    MOUNT_NODE
  )
}

render()
