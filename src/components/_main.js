import React from 'react'
import { Switch } from 'react-router-dom'
import Home from './home'
import NoMatch from './noMatch'
import About from './about'
import Topics from './topics'
import AnimateRoute from './AnimateRoute'

const Main = () => (
  <div className='main'>
    <Switch>
      <AnimateRoute transition='slide' exact path='/' component={Home} />
      <AnimateRoute transition='slide' path='/about' component={About} />
      <AnimateRoute transition='slide' path='/topics' component={Topics} />
      <AnimateRoute transition='slide' component={NoMatch} />
    </Switch>
  </div>
)

export default Main
