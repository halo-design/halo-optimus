import React from 'react'
import { Route } from 'react-router-dom'
import Home from './home'
import About from './aboutSync'
import Topics from './topicsSync'

const Main = () => (
  <div className='main' style={{
    backgroundColor: 'gray'
  }}>
    <Route exact path='/' component={Home} />
    <Route path='/about' component={About} />
    <Route path='/topics' component={Topics} />
  </div>
)

export default Main
