import React from 'react'
import { HashRouter as Router, Switch } from 'react-router-dom'
import AnimateRoute from 'COMPONENT/AnimateRoute'
import Mismatch from 'COMPONENT/Mismatch'
import Login from './Login'
import Main from './Main'
import 'STYLE'

const App = () => (
  <Router basename='/'>
    <Switch>
      <AnimateRoute transition='slide' exact path='/' component={Mismatch} />
      <AnimateRoute transition='slide' path='/login' component={Login} />
      <AnimateRoute transition='slide' path='/main' component={Main} />
      <AnimateRoute transition='slide' component={Mismatch} />
    </Switch>
  </Router>
)

export default App
