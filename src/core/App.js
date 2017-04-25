import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createStore from './store'
import App from 'VIEW/App'

const store = createStore()
// console.remote('可以远程打印日志了！')
const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('MOUNT_NODE')
  )
}

render()
