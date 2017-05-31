import React from 'react'
import BufferCompnent from 'COMPONENT/effects/Buffer'
import upgradeManage from 'bundle-loader?lazy&name=upgradeManage!./index'

export default () => <BufferCompnent compnent={upgradeManage} />
