import React from 'react'
import Counter from '../Counter'

export default class About extends React.Component {
  render () {
    return (
      <div className='about'>
        <Counter />
        <h2>About</h2>
      </div>
    )
  }
}
