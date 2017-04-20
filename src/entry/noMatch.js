import React from 'react'
import { Redirect } from 'react-router-dom'

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
    {location.pathname === '/1' ? (<Redirect to='/' />) : (<Redirect to='/about' />)
    }
  </div>
)

export default NoMatch

