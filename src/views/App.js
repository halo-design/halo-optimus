import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Mismatch from './Mismatch'
import Login from './Login'
import Main from './Main'
import 'STYLE'

const App = () => (
  <Router basename='/'>
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/home' component={Main} />
      <Route component={Mismatch} />
    </Switch>
  </Router>
)

export default App
