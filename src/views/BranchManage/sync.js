import React from 'react'
import Lazy from 'COMPONENT/Lazy'
import Loading from 'COMPONENT/Loading'
import loadBranchManage from 'bundle-loader?lazy&name=branchManage!./index'

const BranchManage = () => (
  <Lazy load={loadBranchManage}>
    {BranchManage => BranchManage ? <BranchManage /> : <Loading />}
  </Lazy>
)

export default BranchManage
