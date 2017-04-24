import React from 'react'
import Lazy from 'COMPONENT/Lazy'
import Loading from 'COMPONENT/Loading'
import loadUserManage from 'bundle-loader?lazy&name=userManage!./index'

const UserManage = () => (
  <Lazy load={loadUserManage}>
    {UserManage => UserManage ? <UserManage /> : <Loading />}
  </Lazy>
)

export default UserManage
