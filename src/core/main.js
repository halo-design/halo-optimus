import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import createStore from 'STORE/createStore'
import { rootPath } from 'CONSTANT/config'
import App from 'VIEW/App'

const store = createStore()
const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router basename={rootPath}>
        <App />
      </Router>
    </Provider>,
    document.getElementById('MOUNT_NODE')
  )
}

render()
