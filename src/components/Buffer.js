import React from 'react'
import Lazy from 'COMPONENT/Lazy'
import Loading from 'COMPONENT/Loading'

const BufferCompnent = ({ compnent }) => (
  <Lazy load={compnent}>
    {BufferCompnent => BufferCompnent ? <BufferCompnent /> : <Loading />}
  </Lazy>
)

export default BufferCompnent
