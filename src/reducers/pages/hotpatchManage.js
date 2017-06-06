import createReducer from 'STORE/createReducer'
import NProgress from 'nprogress'
import * as RQ from '../fetch/hotpatch'
import { changeTaskStatusAction } from '../fetch/update'
import { NotiSuccess, NotiError } from 'UTIL/info'

export const queryHotpatchList = () => (dispatch, getState) => {
  NProgress.start()
  dispatch(RQ.queryHotpatchAction()).then(action => {
    const dataBody = action.data.body
    if (dataBody.errorCode === '0') {
      dispatch(setHotpatchList(dataBody.hotpatchResourceList))
    }
    NProgress.done()
  })
}

export const getHotpatchTaskList = (data, cb) => (dispatch, getState) => {
  dispatch(RQ.queryHotpatchTaskAction(data)).then(action => {
    const dataBody = action.data.body
    let list = getState().pages.hotpatchManage.hotpatchTaskList
    if (dataBody.errorCode === '0') {
      list = {
        ...list,
        [data.hotpatchId]: dataBody.versionTaskList
      }
    }
    dispatch(setHotpatchTaskList(list))
    cb && cb(dataBody)
  })
}

export const changeTaskStatus = (state, success, fail) => (dispatch, getState) => {
  dispatch(changeTaskStatusAction(state)).then(action => {
    if (action.data.body.errorCode === '0') {
      dispatch(getHotpatchTaskList({hotpatchId: state.hotpatchId}))
      NotiSuccess({ description: '修改成功！' })
      success && success()
    } else {
      NotiError({ description: '修改失败！' })
      fail && fail()
    }
  })
}

export const addHotpatchList = (state, success, fail) => (dispatch, getState) => {
  dispatch(RQ.addHotpatchAction(state)).then(action => {
    if (action.data.body.errorCode === '0') {
      dispatch(queryHotpatchList())
      NotiSuccess({ description: '添加成功！' })
      success && success()
    } else {
      NotiError({ description: '添加失败！' })
      fail && fail()
    }
  })
}

export const addHotpatchTask = (state, success, fail) => (dispatch, getState) => {
  let str = '添加'
  if ('id' in state) {
    str = '修改'
  }
  dispatch(RQ.addHotpatchTaskAction(state)).then(action => {
    if (action.data.body.errorCode === '0') {
      dispatch(getHotpatchTaskList({hotpatchId: state.hotpatchId}))
      NotiSuccess({ description: str + '成功！' })
      success && success()
    } else {
      NotiError({ description: str + '失败！' })
      fail && fail()
    }
  })
}

const actionsReducer = createReducer({
  setHotpatchList: hotpatchList => ({ hotpatchList }),
  setHotpatchTaskList: hotpatchTaskList => ({ hotpatchTaskList }),
  setAddHotpatchVisible: addHotpatchVisible => ({ addHotpatchVisible }),
  setAddEditHotpatchState: addEditHotpatchState => ({ addEditHotpatchState })
}, {
  hotpatchList: [],
  hotpatchTaskList: [],
  addHotpatchVisible: false,
  addEditHotpatchState: {
    mode: 'add',
    taskId: null,
    initData: null,
    itemInfo: null,
    visible: false
  }
})

export const { setHotpatchList, setHotpatchTaskList, setAddHotpatchVisible, setAddEditHotpatchState } = actionsReducer.actions
export default actionsReducer.reducer
