import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import About from './About/sync'

const App = () => (
  <Router basename='/'>
    <div>
      <ul className='nav' style={{
        backgroundColor: 'red'
      }}>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/topics'>Topics</Link></li>
        <li><Link to='/null'>null</Link></li>
      </ul>
      <Route path='/about' component={About} />
    </div>
  </Router>
)

export default App
