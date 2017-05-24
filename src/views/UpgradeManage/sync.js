import React from 'react'
import Lazy from 'COMPONENT/Lazy'
import Loading from 'COMPONENT/Loading'
import loadUpgradeManage from 'bundle-loader?lazy&name=upgradeManage!./index'

const UpgradeManage = () => (
  <Lazy load={loadUpgradeManage}>
    {UpgradeManage => UpgradeManage ? <UpgradeManage /> : <Loading />}
  </Lazy>
)

export default UpgradeManage
