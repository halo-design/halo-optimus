import createReducer from 'STORE/createReducer'
import NProgress from 'nprogress'
import * as RQ from '../fetch/update'
import { NotiSuccess, NotiError, MsgError } from 'UTIL/info'

export const queryUpdateList = () => async (dispatch, getState) => {
  NProgress.start()
  const action = await dispatch(RQ.queryUpdateListAction())
  const dataBody = action.data.body
  if (dataBody.errorCode === '0') {
    dispatch(setUpgrageList(dataBody.upgradeList))
  }
  NProgress.done()
}

export const getUpgradeTaskList = (data, cb) => async (dispatch, getState) => {
  const action = await dispatch(RQ.getUpgradeTaskAction(data))
  const dataBody = action.data.body
  let list = getState().pages.updateManage.upgradeTaskList
  if (dataBody.errorCode === '0') {
    list = {
      ...list,
      [data.packageInfoId]: dataBody.versionTaskList
    }
  }
  dispatch(setUpgradeTaskList(list))
  cb && cb(dataBody)
}

export const addUpgradeList = (state, success, fail) => async (dispatch, getState) => {
  const action = await dispatch(RQ.addUpgradeListAction(state))
  if (action.data.body.errorCode === '0') {
    dispatch(queryUpdateList())
    NotiSuccess({ description: '添加成功！' })
    success && success()
  } else {
    NotiError({ description: '添加失败！' })
    fail && fail()
  }
}

export const getTaskDetail = (state, success, fail) => async (dispatch, getState) => {
  const action = await dispatch(RQ.getTaskDetailAction(state))
  const dataBody = action.data.body
  if (dataBody.errorCode === '0') {
    success && success(dataBody)
  } else {
    MsgError('获取列表失败！')
    fail && fail()
  }
}

export const addUpgradeTask = (state, success, fail) => async (dispatch, getState) => {
  let str = '添加'
  if ('id' in state) {
    str = '修改'
  }
  const action = await dispatch(RQ.addUpgradeTaskAction(state))
  if (action.data.body.errorCode === '0') {
    dispatch(getUpgradeTaskList({packageInfoId: state.packageInfoId}))
    NotiSuccess({ description: str + '成功！' })
    success && success()
  } else {
    NotiError({ description: str + '失败！' })
    fail && fail()
  }
}

export const changeTaskStatus = (state, success, fail) => async (dispatch, getState) => {
  const action = await dispatch(RQ.changeTaskStatusAction(state))
  if (action.data.body.errorCode === '0') {
    dispatch(getUpgradeTaskList({packageInfoId: state.packageInfoId}))
    NotiSuccess({ description: '修改成功！' })
    success && success()
  } else {
    NotiError({ description: '修改失败！' })
    fail && fail()
  }
}

const actionsReducer = createReducer({
  setUpgrageList: upgradeList => ({ upgradeList }),
  setAddPkgVisible: addPkgVisible => ({ addPkgVisible }),
  setAddEditRelState: addEditReleaseState => ({ addEditReleaseState }),
  setUpgradeTaskList: upgradeTaskList => ({ upgradeTaskList })
}, {
  upgradeList: [],
  upgradeTaskList: {},
  addPkgVisible: false,
  addEditReleaseState: {
    mode: 'add',
    taskId: null,
    initData: null,
    itemInfo: null,
    visible: false
  }
})

export const { setUpgrageList, setAddPkgVisible, setAddEditRelState, setUpgradeTaskList } = actionsReducer.actions
export default actionsReducer.reducer
