import React from 'react'
import Bundle from './bundle'
import Loading from './loading'
import loadTopics from 'bundle-loader?lazy&name=topics!./topics'

const Topics = ({ match }) => (
  <Bundle load={loadTopics}>
    {Topics => Topics ? <Topics match={match} /> : <Loading />}
  </Bundle>
)

export default Topics
