import NProgress from 'nprogress'
import { NotiSuccess, NotiWarning } from 'UTIL/info'
import * as RQ from '../fetch/resource'

const GET_RESOURCE_LIST_DATA = 'GET_RESOURCE_LIST_DATA'
const SET_RESOURCE_STATE = 'SET_RESOURCE_STATE'

export const queryResourceList = () => (dispatch, getState) => {
  NProgress.start()
  dispatch(RQ.queryResourceAction()).then(action => {
    const dataBody = action.data.body
    if (dataBody.errorCode === '0') {
      dispatch({
        type: GET_RESOURCE_LIST_DATA,
        data: dataBody.resourceList
      })
    }
    NProgress.done()
  })
}

export const addResourceList = (state, success, fail) => (dispatch, getState) => {
  dispatch(RQ.addResourceAction(state)).then(action => {
    if (action.data.body.errorCode === '0') {
      dispatch(queryResourceList())
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

export const changeResourceList = (state, success, fail) => (dispatch, getState) => {
  dispatch(RQ.changeResourceAction(state)).then(action => {
    if (action.data.body.errorCode === '0') {
      dispatch(queryResourceList())
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

export const delResource = (state, success, fail) => (dispatch, getState) => {
  dispatch(RQ.delResourceAction(state)).then(action => {
    if (action.data.body.errorCode === '0') {
      dispatch(queryResourceList())
      NotiSuccess({
        message: '成功',
        description: '删除成功！'
      })
      success && success()
    } else {
      NotiWarning({
        message: '失败',
        description: '删除失败！'
      })
      fail && fail()
    }
  })
}

export const setAddEditResouceState = state => ({
  type: SET_RESOURCE_STATE,
  data: state
})

const initialState = {
  resourceList: [],
  addEditResourceState: {
    mode: 'add',
    visible: false,
    initData: null
  }
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_RESOURCE_LIST_DATA:
      return {
        ...state,
        resourceList: action.data
      }

    case SET_RESOURCE_STATE:
      return {
        ...state,
        addEditResourceState: action.data
      }

    default:
      return state
  }
}
