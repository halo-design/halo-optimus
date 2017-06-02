import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import createStore from 'STORE/createStore'
import { routeRootPath } from 'CONSTANT/config'
import App from 'VIEW/App'

const supportsHistory = 'pushState' in window.history
const store = createStore()
const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router basename={routeRootPath} forceRefresh={!supportsHistory}>
        <App />
      </Router>
    </Provider>,
    document.getElementById('MOUNT_NODE')
  )
}

render()
