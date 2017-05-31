import NProgress from 'nprogress'
import * as RQ from '../fetch/hotpatch'
import { changeTaskStatusAction } from '../fetch/update'
import { NotiSuccess, NotiError } from 'UTIL/info'

const GET_HOTPATCH_LIST = 'GET_HOTPATCH_LIST'
const GET_HOTPATCH_TASK_LIST = 'GET_HOTPATCH_TASK_LIST'
const SET_ADD_HOTPATCH_VISIBLE = 'SET_ADD_HOTPATCH_VISIBLE'
const SET_HOTPATCH_STATE = 'SET_HOTPATCH_STATE'

export const queryHotpatchList = () => (dispatch, getState) => {
  NProgress.start()
  dispatch(RQ.queryHotpatchAction()).then(action => {
    const dataBody = action.data.body
    if (dataBody.errorCode === '0') {
      dispatch({
        type: GET_HOTPATCH_LIST,
        data: dataBody.hotpatchResourceList
      })
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
    dispatch({
      type: GET_HOTPATCH_TASK_LIST,
      data: list
    })
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

export const setAddHotpatchVisible = state => ({
  type: SET_ADD_HOTPATCH_VISIBLE,
  data: state
})

export const setAddEditHotpatchState = state => ({
  type: SET_HOTPATCH_STATE,
  data: state
})

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

const initialState = {
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
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_HOTPATCH_LIST:
      return {
        ...state,
        hotpatchList: action.data
      }

    case GET_HOTPATCH_TASK_LIST:
      return {
        ...state,
        hotpatchTaskList: action.data
      }

    case SET_ADD_HOTPATCH_VISIBLE:
      return {
        ...state,
        addHotpatchVisible: action.data
      }

    case SET_HOTPATCH_STATE:
      return {
        ...state,
        addEditHotpatchState: action.data
      }

    default:
      return state
  }
}
