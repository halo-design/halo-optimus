import React from 'react'
import Lazy from 'COMPONENT/Lazy'
import Loading from 'COMPONENT/Loading'
import loadStrategySettings from 'bundle-loader?lazy&name=strategySettings!./index'

const StrategySettings = () => (
  <Lazy load={loadStrategySettings}>
    {StrategySettings => StrategySettings ? <StrategySettings /> : <Loading />}
  </Lazy>
)

export default StrategySettings
