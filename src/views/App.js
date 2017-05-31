import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Transition from 'COMPONENT/effects/Transition'
import Mismatch from './Mismatch'
import Login from './Login'
import Main from './Main'
import 'STYLE'

const App = ({ location: { pathname } }) => (
  <Transition changeKey={pathname.split('/')[1]}>
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/home' component={Main} />
      <Route component={Mismatch} />
    </Switch>
  </Transition>
)

export default withRouter(App)
