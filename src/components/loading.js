import React from 'react'

const Loading = () => (
  <div className='app-loading-spin'>
    <span className='spinner'>
      <span className='spinner-inner spinner-wandering-cubes'>
        <span className='spinner-item' />
        <span className='spinner-item' />
      </span>
    </span>
  </div>
)

export default Loading
