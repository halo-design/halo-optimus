import React from 'react'
import Lazy from 'COMPONENT/Lazy'
import Loading from 'COMPONENT/Loading'
import loadCheckHistoryList from 'bundle-loader?lazy&name=checkHistoryList!./index'

const CheckHistoryList = () => (
  <Lazy load={loadCheckHistoryList}>
    {CheckHistoryList => CheckHistoryList ? <CheckHistoryList /> : <Loading />}
  </Lazy>
)

export default CheckHistoryList
