import createReducer from 'STORE/createReducer'
import NProgress from 'nprogress'
import { NotiSuccess, NotiError } from 'UTIL/info'
import * as RQ from '../fetch/whitelist'

export const queryWhiteList = () => (dispatch, getState) => {
  NProgress.start()
  dispatch(RQ.queryWhiteListAction()).then(action => {
    const dataBody = action.data.body
    if (dataBody.errorCode === '0') {
      dispatch(setWhiteList(dataBody.whiteList))
    }
    NProgress.done()
  })
}

export const addWhiteList = (state, success, fail) => (dispatch, getState) => {
  dispatch(RQ.addWhiteListAction(state)).then(action => {
    if (action.data.body.errorCode === '0') {
      dispatch(queryWhiteList())
      NotiSuccess({ description: '添加成功！' })
      success && success()
    } else {
      NotiError({ description: '添加失败！' })
      fail && fail()
    }
  })
}

export const delWhiteList = (state, success, fail) => (dispatch, getState) => {
  dispatch(RQ.delWhiteListAction(state)).then(action => {
    if (action.data.body.errorCode === '0') {
      dispatch(queryWhiteList())
      NotiSuccess({ description: '删除成功！' })
      success && success()
    } else {
      NotiError({ description: '删除失败！' })
      fail && fail()
    }
  })
}

export const addUserId = (state, success, fail) => (dispatch, getState) => {
  dispatch(RQ.whiteListAddAction(state)).then(action => {
    if (action.data.body.errorCode === '0') {
      dispatch(queryWhiteList())
      NotiSuccess({ description: '添加成功！' })
      success && success()
    } else {
      NotiError({ description: '添加失败！' })
      fail && fail()
    }
  })
}

const actionsReducer = createReducer({
  setWhiteList: whiteList => ({ whiteList }),
  setAddWhiteListVisible: addWhiteListVisible => ({ addWhiteListVisible }),
  setAddUserIdState: addUserIdState => ({ addUserIdState })
}, {
  whiteList: [],
  addWhiteListVisible: false,
  addUserIdState: {
    visible: false,
    itemInfo: null
  }
})

export const { setWhiteList, setAddWhiteListVisible, setAddUserIdState } = actionsReducer.actions
export default actionsReducer.reducer
