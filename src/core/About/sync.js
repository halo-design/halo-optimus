import React from 'react'
import Lazy from '../Lazy'
import Loading from '../Loading'
import loadAbout from 'bundle-loader?lazy&name=about!./index'

const About = () => (
  <Lazy load={loadAbout}>
    {About => About ? <About /> : <Loading />}
  </Lazy>
)

export default About
