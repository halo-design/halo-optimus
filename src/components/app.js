import React from 'react'
import { HashRouter as Router, Link } from 'react-router-dom'
import Main from './main'

export default class App extends React.Component {
  render () {
    return (
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
          <Main />
        </div>
      </Router>
    )
  }
}
