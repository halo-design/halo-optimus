import React from 'react'
import { Link } from 'react-router-dom'
import About from './About/sync'

const Main = () => (
  <div className='main'>
    <h1>main</h1>
    <li><Link to='/login'>to login</Link></li>
    <About />
  </div>
)

export default Main
