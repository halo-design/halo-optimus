import NProgress from 'nprogress'
import * as RQ from '../fetch/update'
import { queryResourceAction } from '../fetch/resource'
import { NotiSuccess, NotiWarning, MsgError } from 'UTIL/info'

const GET_UPDATE_LIST = 'GET_UPDATE_LIST'
const SET_ADD_PKG_VISIBLE = 'SET_ADD_PKG_VISIBLE'
const SET_RELEASE_STATE = 'SET_RELEASE_STATE'
const GET_RESOURCE_LIST = 'GET_RESOURCE_LIST'
const GET_UPGRADE_TASK_LIST = 'GET_UPGRADE_TASK_LIST'

export const queryUpdateList = () => (dispatch, getState) => {
  NProgress.start()
  dispatch(RQ.queryUpdateListAction()).then(action => {
    const dataBody = action.data.body
    if (dataBody.errorCode === '0') {
      dispatch({
        type: GET_UPDATE_LIST,
        data: dataBody.upgradeList
      })
    }
    NProgress.done()
  })
}

export const getUpgradeTaskList = (data, cb) => (dispatch, getState) => {
  dispatch(RQ.getUpgradeTaskAction(data)).then(action => {
    const dataBody = action.data.body
    let list = getState().pages.updateManage.upgradeTaskList
    if (dataBody.errorCode === '0') {
      list = {
        ...list,
        [data.packageInfoId]: dataBody.versionTaskList
      }
    }
    dispatch({
      type: GET_UPGRADE_TASK_LIST,
      data: list
    })
    cb && cb(dataBody)
  })
}

export const setAddPkgVisible = state => ({
  type: SET_ADD_PKG_VISIBLE,
  visible: state
})

export const setAddEditRelState = state => ({
  type: SET_RELEASE_STATE,
  data: state
})

export const addUpgradeList = (state, success, fail) => (dispatch, getState) => {
  dispatch(RQ.addUpgradeListAction(state)).then(action => {
    if (action.data.body.errorCode === '0') {
      dispatch(queryUpdateList())
      NotiSuccess({
        message: '成功',
        description: '添加成功！'
      })
      success && success()
    } else {
      NotiWarning({
        message: '失败',
        description: '添加失败！'
      })
      fail && fail()
    }
  })
}

export const getTaskDetail = (state, success, fail) => (dispatch, getState) => {
  dispatch(RQ.getTaskDetailAction(state)).then(action => {
    const dataBody = action.data.body
    if (dataBody.errorCode === '0') {
      success && success(dataBody)
    } else {
      MsgError('获取列表失败！')
      fail && fail()
    }
  })
}

export const addUpgradeTask = (state, success, fail) => (dispatch, getState) => {
  let str = '添加'
  if ('id' in state) {
    str = '修改'
  }
  dispatch(RQ.addUpgradeTaskAction(state)).then(action => {
    if (action.data.body.errorCode === '0') {
      dispatch(getUpgradeTaskList({packageInfoId: state.packageInfoId}))
      NotiSuccess({
        message: '成功',
        description: str + '成功！'
      })
      success && success()
    } else {
      NotiWarning({
        message: '失败',
        description: str + '失败！'
      })
      fail && fail()
    }
  })
}

export const getResourceList = state => (dispatch, getState) => {
  dispatch(queryResourceAction(state)).then(action => {
    const dataBody = action.data.body
    if (dataBody.errorCode === '0') {
      dispatch({
        type: GET_RESOURCE_LIST,
        data: dataBody.resourceList
      })
    }
  })
}

export const changeTaskStatus = (state, success, fail) => (dispatch, getState) => {
  dispatch(RQ.changeTaskStatusAction(state)).then(action => {
    if (action.data.body.errorCode === '0') {
      dispatch(getUpgradeTaskList({packageInfoId: state.packageInfoId}))
      NotiSuccess({
        message: '成功',
        description: '修改成功！'
      })
      success && success()
    } else {
      NotiWarning({
        message: '失败',
        description: '修改失败！'
      })
      fail && fail()
    }
  })
}

const initialState = {
  upgradeList: [],
  resourceList: [],
  upgradeTaskList: {},
  addPkgVisible: false,
  addEditReleaseState: {
    mode: 'add',
    taskId: null,
    initData: null,
    itemInfo: null,
    visible: false
  }
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_UPDATE_LIST:
      return {
        ...state,
        upgradeList: action.data
      }

    case GET_UPGRADE_TASK_LIST:
      return {
        ...state,
        upgradeTaskList: action.data
      }

    case SET_ADD_PKG_VISIBLE:
      return {
        ...state,
        addPkgVisible: action.visible
      }

    case SET_RELEASE_STATE:
      return {
        ...state,
        addEditReleaseState: action.data
      }

    case GET_RESOURCE_LIST:
      return {
        ...state,
        resourceList: action.data
      }

    default:
      return state
  }
}
