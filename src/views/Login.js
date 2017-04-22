import React from 'react'
import { Route, Link } from 'react-router-dom'
import Topics from 'LAYOUT/Topics/sync'

const Login = () => (
  <div className='login'>
    <h1>Login</h1>
    <li><Link to='/main'>to main</Link></li>
    <li><Link to='/login/topics'>to Topics</Link></li>
    <Route path='/login/topics' component={Topics} />
  </div>
)

export default Login
