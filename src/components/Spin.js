import React from 'react'
import { Spin } from 'antd'

export default ({ loading }) => {
  return (
    <div className='app-spin'>
      <Spin size='large' spinning={loading} />
    </div>
  )
}
