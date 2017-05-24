import { getFetch } from 'CONSTANT/api'

export const getRoleListAction = () => getFetch('GET_ROLE_LIST_URL', {
  body: {}
})

export const getRoleByUserAction = num => getFetch('GET_ROLE_BY_USER_URL', {
  body: {
    userNo: num
  }
})

export const getUserRoleListAction = userNo => getFetch('USER_BIND_ROLE_URL', {
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

export const getAllRoleFnItemsAction = (curPage, roleId, roleName, state, pageSize) => getFetch('GET_ALL_ITEM_PAGE_URL', {
  body: {
    currentPage: curPage,
    turnPageShowNum: pageSize,
    roleId: roleId || '',
    roleName: roleName || '',
    state: state || ''
  }
})

export const getInfoByRoleIdAction = roleId => getFetch('GET_ITEM_BY_ROLE_URL', {
  body: {
    roleId: roleId
  }
})

export const getInfoByRoleNameAction = roleName => getFetch('GET_ITEM_BY_ROLE_URL', {
  body: {
    roleName: roleName || ''
  }
})

export const updateRoleAction = data => getFetch('ROLE_UPDATE_URL', {
  body: data
})

export const addRoleAction = data => getFetch('ROLE_ADD_URL', {
  body: data
})

export const itemsBindRoleAction = (roleId, roleMenuItemRelList) => getFetch('ROLE_BIND_ITEM_URL', {
  body: {
    roleId: roleId || '',
    roleMenuItemRelList
  }
})

export const delRoleAction = roleId => getFetch('ROLE_DEL_URL', {
  body: {
    roleId
  }
})
