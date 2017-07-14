import createReducer from 'STORE/createReducer'
import NProgress from 'nprogress'
import { NotiSuccess, NotiError, MsgError } from 'UTIL/info'
import { getRoleTree } from '../public/bindRole'
import { getAllRoleFnItemsAction, getInfoByRoleIdAction, getInfoByRoleNameAction, updateRoleAction, addRoleAction, itemsBindRoleAction, delRoleAction } from '../fetch/role'

// 获取角色详情和功能列表
export const getAllRoleFnItems = (curPage, roleId, roleName, reqType) => (dispatch, getState) => {
  !roleId
    ? dispatch(clearTableItems())
    : dispatch(getAllRoleFnItemsAction(curPage, roleId, roleName, reqType, getState().pages.roleManage.pageSize))
      .then(action => {
        const dataBody = action.data.body
        if (dataBody.errorCode === '0') {
          const roleMenuItemRelList = dataBody.roleMenuItemRelList
          const turnPageTotalNum = dataBody.turnPageTotalNum
          // 复制数组，并为其添加key属性，用于table遍历生成
          let tableCurPageItems = [].concat(roleMenuItemRelList)
          roleMenuItemRelList.map((item, i) => {
            tableCurPageItems[i].key = item.menuItemId
          })
          if (reqType === 1) {
            dispatch(updateTableItems(tableCurPageItems, curPage, turnPageTotalNum))
          } else if (reqType === 2) {
            let selectKeys = []
            roleMenuItemRelList.map(item => {
              selectKeys.push(item.menuItemId)
            })
            dispatch(setAllMenuFnSelectKeys(selectKeys))
          } else {
            dispatch(updateMenuFnPageItems(tableCurPageItems, curPage, turnPageTotalNum))
          }
        } else {
          MsgError('获取列表失败！')
        }
      })
}

// 通过角色id获取当前选中角色信息
export const getInfoByRoleId = roleId => (dispatch, getState) => {
  NProgress.start()
  dispatch(getInfoByRoleIdAction(roleId)).then(action => {
    const dataBody = action.data.body
    if (dataBody.errorCode === '0') {
      dispatch(applyCurRoleInfo(dataBody))
      NProgress.done()
    } else {
      NProgress.done()
      MsgError('获取信息失败！')
    }
  })
}

// 通过角色名搜索相关信息
export const getInfoByRoleName = (roleName, cb) => (dispatch, getState) => {
  NProgress.start()
  dispatch(getInfoByRoleNameAction(roleName)).then(action => {
    const dataBody = action.data.body
    if (dataBody.errorCode === '0') {
      dispatch(applyCurRoleInfo(dataBody))
      NProgress.done()
      if (cb) cb(dataBody)
    } else {
      NProgress.done()
      MsgError('获取信息失败！')
    }
  })
}

// 更新角色信息
export const updateRole = params => (dispatch, getState) => {
  dispatch(updateRoleAction(params)).then(action => {
    const dataBody = action.data.body
    if (dataBody.errorCode === '0') {
      NotiSuccess({ description: '角色更新成功！' })
      // 刷新一次选择的树
      dispatch(getRoleTree())
      dispatch(getInfoByRoleId(params.roleId))
    } else {
      NotiError({ description: '角色更新失败！' })
    }
  })
}

// 添加用户
export const addRole = (params, success, fail) => (dispatch, getState) => {
  dispatch(addRoleAction(params)).then(action => {
    if (action.data.body.errorCode === '0') {
      NotiSuccess({ description: '角色添加成功！' })
      // 刷新一次选择的树
      dispatch(getRoleTree())
      if (success) success()
    } else {
      NotiError({ description: '角色添加失败！' })
      if (fail) fail()
    }
  })
}

// 绑定功能列表到角色上
export const itemsBindRole = (roleId, roleMenuItemRelList, success, fail) => (dispatch, getState) => {
  dispatch(itemsBindRoleAction(roleId, roleMenuItemRelList)).then(action => {
    if (action.data.body.errorCode === '0') {
      NotiSuccess({ description: '功能关联成功！' })
      dispatch(getAllRoleFnItems(1, roleId, '', 1))
      if (success) success()
    } else {
      NotiError({ description: '功能关联失败！' })
      if (fail) fail()
    }
  })
}

// 删除角色
export const delRole = roleId => (dispatch, getState) => {
  dispatch(delRoleAction(roleId)).then(action => {
    if (action.data.body.errorCode === '0') {
      NotiSuccess({ description: '角色删除成功！' })
      dispatch(getRoleTree())
    } else {
      NotiError({ description: '角色删除失败！' })
    }
  })
}

const actionsReducer = createReducer({
  clearTableItems: () => ({
    tableCurPageItems: [],
    tableCurPage: 1,
    tableTotalSize: 0
  }),
  updateTableItems: (tableCurPageItems, tableCurPage, tableTotalSize) => ({
    tableCurPageItems,
    tableCurPage,
    tableTotalSize
  }),
  clearCurRoleInfo: () => ({
    curRoleInfo: {
      roleDesc: '',
      selectModifyRole: '',
      roleStatus: '',
      roleName: '',
      roleId: ''
    },
    selectModifyRole: ''
  }),
  applyCurRoleInfo: info => ({
    curRoleInfo: {
      roleDesc: info.roleDesc,
      selectModifyRole: info.rolePId,
      roleStatus: info.roleStatus,
      roleName: info.roleName,
      // 数据库拿到的数据带有'undefined'字符串，他们的锅，这个坑我填了
      roleId: info.roleId && info.roleId !== 'undefined' ? info.roleId : ''
    },
    selectModifyRole: info.rolePId
  }),
  setSelectTreeVal: val => ({ selectModifyRole: val || '' }),
  setAddRoleBoxVisible: addBoxVisible => ({ addBoxVisible }),
  setBindRoleBoxVisible: bindBoxVisible => ({ bindBoxVisible }),
  updateMenuFnPageItems: (allMenuFnCurPageItems, allMenuFnCurPage, allMenuTotalSize) => ({ allMenuFnCurPageItems, allMenuFnCurPage, allMenuTotalSize }),
  clearMenuFnItems: () => ({
    allMenuFnCurPageItems: [],
    allMenuFnCurPage: 1,
    allMenuTotalSize: 0,
    allMenuFnSelectKeys: []
  }),
  setAllMenuFnSelectKeys: allMenuFnSelectKeys => ({ allMenuFnSelectKeys })
}, {
  pageSize: 8,

  tableCurPageItems: [],
  tableCurPage: 1,
  tableTotalSize: 0,

  allMenuFnCurPageItems: [],
  allMenuFnCurPage: 1,
  allMenuTotalSize: 0,
  allMenuFnSelectKeys: [],

  curRoleInfo: {
    roleDesc: '',
    selectModifyRole: '',
    roleStatus: '',
    roleName: '',
    roleId: ''
  },

  selectModifyRole: '',
  addBoxVisible: false,
  bindBoxVisible: false
})

export const { clearTableItems, updateTableItems, clearCurRoleInfo, applyCurRoleInfo, setSelectTreeVal, setAddRoleBoxVisible, setBindRoleBoxVisible, updateMenuFnPageItems, clearMenuFnItems, setAllMenuFnSelectKeys } = actionsReducer.actions
export default actionsReducer.reducer
