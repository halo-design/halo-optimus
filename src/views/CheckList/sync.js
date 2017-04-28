import React from 'react'
import Lazy from 'COMPONENT/Lazy'
import Loading from 'COMPONENT/Loading'
import loadCheckList from 'bundle-loader?lazy&name=checkList!./index'

const CheckList = () => (
  <Lazy load={loadCheckList}>
    {CheckList => CheckList ? <CheckList /> : <Loading />}
  </Lazy>
)

export default CheckList
