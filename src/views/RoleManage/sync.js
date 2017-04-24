import React from 'react'
import Lazy from 'COMPONENT/Lazy'
import Loading from 'COMPONENT/Loading'
import loadRoleManage from 'bundle-loader?lazy&name=roleManage!./index'

const RoleManage = () => (
  <Lazy load={loadRoleManage}>
    {RoleManage => RoleManage ? <RoleManage /> : <Loading />}
  </Lazy>
)

export default RoleManage
