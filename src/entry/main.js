import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './home'
import NoMatch from './noMatch'
import About from './aboutSync'
import Topics from './topicsSync'
import './fade.css'

const Main = () => (
  <div className='main' style={{
    backgroundColor: 'gray'
  }}>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/topics' component={Topics} />
      <Route component={NoMatch} />
    </Switch>
  </div>
)

export default Main
