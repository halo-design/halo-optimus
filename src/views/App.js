import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Animater from 'COMPONENT/Animater'
import Mismatch from './Mismatch'
import Login from './Login'
import Main from './Main'
import 'STYLE'

const App = ({ location }) => (
  <Animater changeKey={location.pathname.split('/')[1]}>
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/home' component={Main} />
      <Route component={Mismatch} />
    </Switch>
  </Animater>
)

export default withRouter(App)
