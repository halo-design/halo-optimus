import React from 'react'
import BufferCompnent from 'COMPONENT/Buffer'
import branchManage from 'bundle-loader?lazy&name=branchManage!./index'

export default () => <BufferCompnent compnent={branchManage} />
