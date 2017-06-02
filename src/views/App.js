import React from 'react'
import { withRouter } from 'react-router-dom'
import Transition from 'COMPONENT/effects/Transition'
import createRoutes from 'UTIL/createRoutes'
import Mismatch from './Mismatch'
import Login from './Login'
import Main from './Main'
import 'STYLE'

const App = ({ location: { pathname } }) => (
  <Transition changeKey={pathname.split('/')[1]}>
    {
      createRoutes(null, [{
        path: '/login',
        component: Login
      }, {
        path: '/home',
        component: Main
      }, {
        component: Mismatch
      }])
    }
  </Transition>
)

export default withRouter(App)
