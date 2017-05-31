import React from 'react'
import Lazy from './Lazy'
import Loading from './Loading'

const BufferCompnent = ({ compnent }) => (
  <Lazy load={compnent}>
    {BufferCompnent => BufferCompnent ? <BufferCompnent /> : <Loading />}
  </Lazy>
)

export default BufferCompnent
