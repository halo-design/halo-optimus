import NProgress from 'nprogress'
import * as RQ from '../fetch/update'
import { NotiSuccess, NotiWarning } from 'UTIL/info'

const GET_UPDATE_LIST = 'GET_UPDATE_LIST'
const SET_ADD_PKG_VISIBLE = 'SET_ADD_PKG_VISIBLE'
const SET_RELEASE_VISIBLE = 'SET_RELEASE_VISIBLE'

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

export const getUpgradeTask = (data, cb) => (dispatch, getState) => {
  dispatch(RQ.getUpgradeTaskAction(data)).then(action => {
    cb && cb(action.data.body)
  })
}

export const setAddPkgVisible = state => ({
  type: SET_ADD_PKG_VISIBLE,
  visible: state
})

export const setAddEditRelVisible = state => ({
  type: SET_RELEASE_VISIBLE,
  visible: state
})

export const addUpgradeList = (state, success, fail) => (dispatch, getState) => {
  dispatch(RQ.addUpgradeListAction(state)).then(action => {
    if (action.data.body.errorCode === '0') {
      dispatch(queryUpdateList())
      NotiSuccess({
        message: '成功',
        description: '添加成功！'
      })
      if (success) success()
    } else {
      NotiWarning({
        message: '失败',
        description: '添加失败！'
      })
      if (fail) fail()
    }
  })
}

const initialState = {
  upgradeList: [],
  addPkgVisible: false,
  addEditReleaseVisible: false
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_UPDATE_LIST:
      return {
        ...state,
        upgradeList: action.data
      }

    case SET_ADD_PKG_VISIBLE:
      return {
        ...state,
        addPkgVisible: action.visible
      }

    case SET_RELEASE_VISIBLE:
      return {
        ...state,
        addEditReleaseVisible: action.visible
      }

    default:
      return state
  }
}
