import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import createStore from './store'
import App from 'VIEW/App'

const store = createStore()
const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router basename='/'>
        <App />
      </Router>
    </Provider>,
    document.getElementById('MOUNT_NODE')
  )
}

render()
