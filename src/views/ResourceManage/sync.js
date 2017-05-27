import React from 'react'
import BufferCompnent from 'COMPONENT/Buffer'
import resourceManage from 'bundle-loader?lazy&name=resourceManage!./index'

export default () => <BufferCompnent compnent={resourceManage} />
