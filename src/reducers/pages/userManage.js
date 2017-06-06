import createReducer from 'STORE/createReducer'
import { getRoleByUserAction } from '../fetch/role'
import { userPageByBrhAction, addUserAction, updateUserAction, delUserAction } from '../fetch/user'
import NProgress from 'nprogress'
import { NotiSuccess, NotiError, MsgWarning } from 'UTIL/info'

// 查询用户信息 搜索功能 分页功能
export const userPageByBrh = (params, cb) => (dispatch, getState) => {
  NProgress.start()
  let pageShowNum = getState().pages.userManage.pageData.turnPageShowNum
  dispatch(userPageByBrhAction(params, pageShowNum)).then(action => {
    const dataBody = action.data.body
    const userList = dataBody.userList.map(user => ({
      ...user,
      key: user.userNo
    }))
    const data = {
      userList: userList,
      totalSize: dataBody.turnPageTotalNum,
      pageData: {
        turnPageShowNum: dataBody.turnPageShowNum,
        currentPage: dataBody.currentPage
      }
    }
    dispatch(updateSelectKeys([params.brhId]))
    dispatch(pageUsers(data))
    NProgress.done()
    if (cb) cb()
  })
}

export const previewUser = (num, success, fail) => (dispatch, getState) => {
  dispatch(getRoleByUserAction(num)).then(action => {
    dispatch(setPreviewInfo(action.data.body))
    if (success) success()
  }, () => {
    MsgWarning('获取失败！')
    if (fail) fail()
  })
}

export const modifyUser = (num, success, fail) => (dispatch, getState) => {
  dispatch(getRoleByUserAction(num)).then(action => {
    dispatch(applyInitVal(action.data.body))
    if (success) success()
  }, () => {
    MsgWarning('获取失败！')
    if (fail) fail()
  })
}

export const addUser = (params, success, fail) => (dispatch, getState) => {
  dispatch(addUserAction(params)).then(action => {
    const dataBody = action.data.body
    if (dataBody.errorCode === '0') {
      let dataList = {
        brhId: params.brhId
      }
      dispatch(userPageByBrhAction(dataList, 10)).then(action => {
        const dataBody = action.data.body
        let userList = dataBody.userList.map(user => ({
          ...user,
          key: user.userNo
        }))
        let data = {
          totalSize: dataBody.turnPageTotalNum,
          turnPageShowNum: dataBody.turnPageShowNum,
          currentPage: dataBody.currentPage,
          userList: userList
        }
        dispatch(updateSelectKeys([params.brhId]))
        dispatch(pageUsers(data))
      })
      NotiSuccess({ description: '用户添加成功！' })
      if (success) success()
    } else {
      NotiError({ description: '用户添加失败！' })
      if (fail) fail()
    }
  })
}

export const updateUser = (params, success, fail) => (dispatch, getState) => {
  dispatch(updateUserAction(params)).then(action => {
    if (action.data.body.errorCode === '0') {
      dispatch(userPageByBrh({
        currentPage: '1',
        brhId: params.brhId,
        brhName: ''
      }))
      NotiSuccess({ description: '用户修改成功！' })
      if (success) success()
    } else {
      NotiError({ description: '用户修改失败！' })
      if (fail) fail()
    }
  })
}

// 删除并更新用户列表
export const delUserUpdate = (userNo, brhId, curPage) => (dispatch, getState) => {
  dispatch(delUserAction(userNo)).then(action => {
    const dataBody = action.data.body
    if (dataBody.errorCode === '0') {
      NotiSuccess({
        message: '成功',
        description: '用户删除成功！'
      })
      dispatch(userPageByBrh({ brhId }))
    } else {
      NotiError({
        message: '失败',
        description: `删除用户失败，errCode: ${dataBody.errorCode}，errMsg: ${dataBody.errorMsg}`
      })
    }
  })
}

const actionsReducer = createReducer({
  pageUsers: data => data,
  setPreviewInfo: info => ({
    previewBox: {
      visible: true,
      info
    }
  }),
  closePreviewUser: () => ({
    previewBox: {
      visible: false,
      info: {}
    }
  }),
  userBindRole: info => ({
    bindRoleBox: {
      visible: true,
      info
    }
  }),
  closeBindRole: info => ({
    bindRoleBox: {
      visible: false,
      info: {}
    }
  }),
  applyInitVal: initVal => ({
    userBox: {
      initVal,
      visible: true,
      type: 'MODIFY'
    }
  }),
  colseModifyUser: () => ({
    userBox: {
      initVal: {},
      visible: false,
      type: 'MODIFY'
    }
  }),
  setAddUserBoxVsisible: visible => ({
    userBox: {
      visible,
      initVal: {},
      type: 'ADD'
    }
  }),
  updateSelectKeys: selectedKeys => ({ selectedKeys })
}, {
  count: 0,
  userList: [],
  totalSize: 0,
  userBox: {
    visible: false,
    initVal: {},
    type: 'ADD'
  },
  previewBox: {
    visible: false,
    info: {}
  },
  bindRoleBox: {
    visible: false,
    info: {}
  },
  pageData: {
    currentPage: 1,
    turnPageShowNum: 10
  },
  selectedKeys: []
})

export const { pageUsers, setPreviewInfo, closePreviewUser, userBindRole, closeBindRole, applyInitVal, colseModifyUser, setAddUserBoxVsisible, updateSelectKeys } = actionsReducer.actions
export default actionsReducer.reducer
