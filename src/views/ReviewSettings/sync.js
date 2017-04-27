import React from 'react'
import Lazy from 'COMPONENT/Lazy'
import Loading from 'COMPONENT/Loading'
import loadReviewSettings from 'bundle-loader?lazy&name=reviewSettings!./index'

const ReviewSettings = () => (
  <Lazy load={loadReviewSettings}>
    {ReviewSettings => ReviewSettings ? <ReviewSettings /> : <Loading />}
  </Lazy>
)

export default ReviewSettings
