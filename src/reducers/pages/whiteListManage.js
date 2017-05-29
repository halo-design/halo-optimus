import NProgress from 'nprogress'
import { NotiSuccess, NotiWarning } from 'UTIL/info'
import * as RQ from '../fetch/whitelist'

const GET_WHITE_LIST = 'GET_WHITE_LIST'
const SET_ADD_WHITELIST_VISIBLE = 'SET_ADD_WHITELIST_VISIBLE'
const SET_ADDUSERID_STATE = 'SET_ADDUSERID_STATE'

export const queryWhiteList = () => (dispatch, getState) => {
  NProgress.start()
  dispatch(RQ.queryWhiteListAction()).then(action => {
    const dataBody = action.data.body
    if (dataBody.errorCode === '0') {
      dispatch({
        type: GET_WHITE_LIST,
        data: dataBody.whiteList
      })
    }
    NProgress.done()
  })
}

export const setAddWhiteListVisible = state => ({
  type: SET_ADD_WHITELIST_VISIBLE,
  data: state
})

export const addWhiteList = (state, success, fail) => (dispatch, getState) => {
  dispatch(RQ.addWhiteListAction(state)).then(action => {
    if (action.data.body.errorCode === '0') {
      dispatch(queryWhiteList())
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

export const delWhiteList = (state, success, fail) => (dispatch, getState) => {
  dispatch(RQ.delWhiteListAction(state)).then(action => {
    if (action.data.body.errorCode === '0') {
      dispatch(queryWhiteList())
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

export const setAddUserIdState = state => ({
  type: SET_ADDUSERID_STATE,
  data: state
})

export const addUserId = (state, success, fail) => (dispatch, getState) => {
  dispatch(RQ.whiteListAddAction(state)).then(action => {
    if (action.data.body.errorCode === '0') {
      dispatch(queryWhiteList())
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

const initialState = {
  whiteList: [],
  addWhiteListVisible: false,
  addUserIdState: {
    visible: false,
    itemInfo: null
  }
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_WHITE_LIST:
      return {
        ...state,
        whiteList: action.data
      }

    case SET_ADD_WHITELIST_VISIBLE:
      return {
        ...state,
        addWhiteListVisible: action.data
      }

    case SET_ADDUSERID_STATE:
      return {
        ...state,
        addUserIdState: action.data
      }

    default:
      return state
  }
}
