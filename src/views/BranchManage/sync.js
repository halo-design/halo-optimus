import React from 'react'
import BufferCompnent from 'COMPONENT/effects/Buffer'
import branchManage from 'bundle-loader?lazy&name=branchManage!./index'

export default () => <BufferCompnent compnent={branchManage} />
