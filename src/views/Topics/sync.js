import React from 'react'
import Lazy from 'COMPONENT/Lazy'
import Loading from 'COMPONENT/Loading'
import loadTopics from 'bundle-loader?lazy&name=topics!./index'

const Topics = ({ match }) => (
  <Lazy load={loadTopics}>
    {Topics => Topics ? <Topics match={match} /> : <Loading />}
  </Lazy>
)

export default Topics
