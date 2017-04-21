import React from 'react'
import Lazy from 'COMPONENT/Lazy'
import Loading from 'COMPONENT/Loading'
import loadAbout from 'bundle-loader?lazy&name=about!./index'

const About = () => (
  <Lazy load={loadAbout}>
    {About => About ? <About /> : <Loading />}
  </Lazy>
)

export default About
