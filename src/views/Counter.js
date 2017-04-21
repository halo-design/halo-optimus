import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import * as counterAction from 'REDUCER/counter'

@connect(
  state => state,
  dispatch => bindActionCreators({ ...counterAction }, dispatch)
)
class Counter extends React.Component {
  render () {
    const { counter, increment, logtime } = this.props
    return (
      <div className='counter'>
        <span>{counter.count}</span>
        <span>{counter.time}</span>
        <button onClick={increment}>增加</button>
        <button onClick={logtime}>增加2</button>
      </div>
    )
  }
}
export default withRouter(Counter)

