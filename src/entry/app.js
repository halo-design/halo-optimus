import React from 'react'
import { HashRouter, Link } from 'react-router-dom'
import Main from './main'

export default class App extends React.Component {

  render () {
    return (
      <HashRouter basename='/'>
        <div>
          <ul className='nav' style={{
            backgroundColor: 'red'
          }}>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/topics'>Topics</Link></li>
          </ul>
          <Main />
        </div>
      </HashRouter>
    )
  }
}
