import React from 'react'
import Lazy from 'COMPONENT/Lazy'
import Loading from 'COMPONENT/Loading'
import loadApplyHistoryList from 'bundle-loader?lazy&name=applyHistoryList!./index'

const ApplyHistoryList = () => (
  <Lazy load={loadApplyHistoryList}>
    {ApplyHistoryList => ApplyHistoryList ? <ApplyHistoryList /> : <Loading />}
  </Lazy>
)

export default ApplyHistoryList
