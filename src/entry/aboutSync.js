import React from 'react'
import Bundle from './bundle'
import Loading from './loading'
import loadAbout from 'bundle-loader?lazy&name=about!./about'

const About = () => (
  <Bundle load={loadAbout}>
    {About => About ? <About /> : <Loading />}
  </Bundle>
)

export default About
