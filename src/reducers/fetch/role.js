import { getFetch } from 'CONSTANT/api'

export const getRoleListAction = () => getFetch('GET_ROLE_LIST', {
  body: {}
})

export const getRoleByUserAction = num => getFetch('GET_ROLE_BY_USER', {
  body: {
    userNo: num
  }
})

export const getUserRoleListAction = userNo => getFetch('SET_USER_BIND_ROLE', {
  body: {
    userNo: userNo
  }
})

export const userRoleAssociationAction = (userNo, userName, roleList) => getFetch('CONNET_USER_AND_ROLE_URL', {
  body: {
    userNo: userNo,
    name: userName,
    roleList: roleList || []
  }
})

export const getAllRoleFnItemsAction = (curPage, roleId, roleName, state, pageSize) => getFetch('GET_ROLE_ALL_ITEM', {
  body: {
    currentPage: curPage,
    turnPageShowNum: pageSize,
    roleId: roleId || '',
    roleName: roleName || '',
    state: state || ''
  }
})

export const getInfoByRoleIdAction = roleId => getFetch('GET_ROLE_ITEM', {
  body: {
    roleId: roleId
  }
})

export const getInfoByRoleNameAction = roleName => getFetch('GET_ROLE_ITEM', {
  body: {
    roleName: roleName || ''
  }
})

export const updateRoleAction = data => getFetch('SET_ROLE_UPDATE', {
  body: data
})

export const addRoleAction = data => getFetch('ADD_ROLE', {
  body: data
})

export const itemsBindRoleAction = (roleId, roleMenuItemRelList) => getFetch('SET_ROLE_BIND_ITEM', {
  body: {
    roleId: roleId || '',
    roleMenuItemRelList
  }
})

export const delRoleAction = roleId => getFetch('DEL_ROLE', {
  body: {
    roleId
  }
})
